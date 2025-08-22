interface StravaActivity {
  id: number;
  name: string;
  distance: number; // in meters
  moving_time: number; // in seconds
  type: string;
  start_date: string;
  average_speed: number;
  max_speed: number;
  total_elevation_gain: number;
}

interface MonthlyStats {
  currentStreak: number;
  longestStreak: number;
  runsThisMonth: number;
  distanceThisMonth: number;
  avgPaceThisMonth: string;
}

interface StravaStats {
  biggest_ride_distance: number;
  biggest_climb_elevation_gain: number;
  recent_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elevation_gain: number;
  };
  recent_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elevation_gain: number;
  };
  ytd_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elevation_gain: number;
  };
  ytd_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elevation_gain: number;
  };
  all_ride_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elevation_gain: number;
  };
  all_run_totals: {
    count: number;
    distance: number;
    moving_time: number;
    elevation_gain: number;
  };
}

class StravaService {
  private clientId = import.meta.env.VITE_STRAVA_CLIENT_ID;
  private clientSecret = import.meta.env.VITE_STRAVA_CLIENT_SECRET;
  private baseUrl = "https://www.strava.com/api/v3";
  private accessToken: string = import.meta.env.VITE_STRAVA_ACCESS_TOKEN;
  private tokenExpiry: number = 0;

  // Force refresh token (useful after getting new tokens)
  public forceTokenRefresh(): void {
    this.accessToken = "";
    this.tokenExpiry = 0;
    console.log("Forced token refresh - will get new token on next request");
  }

  // Get fresh access token using refresh token
  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: import.meta.env.VITE_STRAVA_REFRESH_TOKEN, // Use fresh env value
          grant_type: "refresh_token",
        }),
      });

      console.log("Token refresh response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Token refresh error:", response.status, errorText);
        throw new Error(
          `Failed to refresh access token: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Token refresh successful");
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + data.expires_in * 1000;

      return this.accessToken;
    } catch (error) {
      console.error("Error refreshing Strava token:", error);
      throw error;
    }
  }

  // Get authenticated user's stats
  async getAthleteStats(athleteId: number): Promise<StravaStats> {
    try {
      const token = await this.getAccessToken();

      const response = await fetch(
        `${this.baseUrl}/athletes/${athleteId}/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch athlete stats");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching athlete stats:", error);
      throw error;
    }
  }

  // Get recent running activities
  async getRunningActivities(limit: number = 10): Promise<StravaActivity[]> {
    try {
      const token = await this.getAccessToken();

      const response = await fetch(
        `${this.baseUrl}/athlete/activities?per_page=${limit}&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch activities: ${response.status} ${errorText}`
        );
      }

      const activities: StravaActivity[] = await response.json();

      // Filter for running activities only
      const runningActivities = activities.filter(
        (activity) =>
          activity.type === "Run" ||
          activity.type === "VirtualRun" ||
          activity.type === "TrailRun"
      );

      return runningActivities;
    } catch (error) {
      console.error("Error fetching running activities:", error);
      throw error;
    }
  }

  // Get current user info (to get athlete ID)
  async getAthlete() {
    try {
      const token = await this.getAccessToken();

      const response = await fetch(`${this.baseUrl}/athlete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch athlete info");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching athlete info:", error);
      throw error;
    }
  }

  // Utility: Convert meters to kilometers
  metersToKm(meters: number): number {
    return Math.round((meters / 1000) * 100) / 100;
  }

  // Utility: Convert seconds to readable time
  secondsToTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  // Utility: Calculate pace from speed (m/s to min/km)
  calculatePace(avgSpeedMs: number): string {
    if (avgSpeedMs === 0) return "0:00";

    const paceSecondsPerKm = 1000 / avgSpeedMs;
    const minutes = Math.floor(paceSecondsPerKm / 60);
    const seconds = Math.floor(paceSecondsPerKm % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  // Calculate monthly stats and streaks
  async getMonthlyStats(): Promise<MonthlyStats> {
    try {
      const activities = await this.getRunningActivities(100); // Get more activities for streak calculation
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // Filter activities for current month
      const thisMonthActivities = activities.filter((activity) => {
        const activityDate = new Date(activity.start_date);
        return (
          activityDate.getMonth() === currentMonth &&
          activityDate.getFullYear() === currentYear
        );
      });

      // Calculate current streak
      const sortedActivities = activities.sort(
        (a, b) =>
          new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      );

      let currentStreak = 0;
      let longestStreak = 0;
      let tempStreak = 0;
      let lastDate: Date | null = null;

      for (const activity of sortedActivities) {
        const activityDate = new Date(activity.start_date);
        activityDate.setHours(0, 0, 0, 0);

        if (lastDate === null) {
          tempStreak = 1;
          if (this.isToday(activityDate) || this.isYesterday(activityDate)) {
            currentStreak = 1;
          }
        } else {
          const daysDiff = Math.floor(
            (lastDate.getTime() - activityDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          if (daysDiff === 1) {
            tempStreak++;
            if (currentStreak > 0) {
              currentStreak = tempStreak;
            }
          } else if (daysDiff > 1) {
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 1;
            if (
              currentStreak === 0 &&
              (this.isToday(activityDate) || this.isYesterday(activityDate))
            ) {
              currentStreak = 1;
            }
          }
        }

        lastDate = activityDate;
      }

      longestStreak = Math.max(longestStreak, tempStreak);

      // Calculate this month stats
      const monthDistance = thisMonthActivities.reduce(
        (total, activity) => total + activity.distance,
        0
      );
      const monthTime = thisMonthActivities.reduce(
        (total, activity) => total + activity.moving_time,
        0
      );
      const avgSpeed =
        thisMonthActivities.length > 0 ? monthDistance / monthTime : 0;

      const result = {
        currentStreak,
        longestStreak,
        runsThisMonth: thisMonthActivities.length,
        distanceThisMonth: this.metersToKm(monthDistance),
        avgPaceThisMonth: this.calculatePace(avgSpeed),
      };

      return result;
    } catch (error) {
      console.error("Error calculating monthly stats:", error);
      return {
        currentStreak: 0,
        longestStreak: 0,
        runsThisMonth: 0,
        distanceThisMonth: 0,
        avgPaceThisMonth: "0:00",
      };
    }
  }

  // Helper methods for date comparison
  private isToday(date: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  }

  private isYesterday(date: Date): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    return date.getTime() === yesterday.getTime();
  }

  // Get Strava profile URL
  async getProfileUrl(): Promise<string> {
    try {
      const athlete = await this.getAthlete();
      return `https://www.strava.com/athletes/${athlete.id}`;
    } catch (error) {
      console.error("Error getting athlete for profile URL:", error);
      // Return a generic Strava URL as fallback
      return "https://www.strava.com/";
    }
  }
}

export default new StravaService();
