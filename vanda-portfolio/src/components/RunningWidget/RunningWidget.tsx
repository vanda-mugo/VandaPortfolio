import React, { useState, useEffect } from "react";
import stravaService from "../../services/stravaService";
import RunningIcon from "./RunningIcon";
import "./RunningWidget.css";

interface RunningData {
  totalKm: number;
  thisYearKm: number;
  totalRuns: number;
  loading: boolean;
  error: string | null;
}

interface MonthlyStats {
  currentStreak: number;
  longestStreak: number;
  runsThisMonth: number;
  distanceThisMonth: number;
  avgPaceThisMonth: string;
}

const RunningWidget: React.FC = () => {
  const [runningData, setRunningData] = useState<RunningData>({
    totalKm: 0,
    thisYearKm: 0,
    totalRuns: 0,
    loading: true,
    error: null,
  });

  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [athleteData, setAthleteData] = useState<{
    id: number;
    username?: string;
  } | null>(null);

  useEffect(() => {
    const fetchRunningData = async () => {
      try {
        setRunningData((prev) => ({ ...prev, loading: true, error: null }));

        // Get athlete info first
        const athlete = await stravaService.getAthlete();
        setAthleteData({ id: athlete.id, username: athlete.username });

        // Get detailed stats
        const stats = await stravaService.getAthleteStats(athlete.id);

        setRunningData({
          totalKm: stravaService.metersToKm(stats.all_run_totals.distance),
          thisYearKm: stravaService.metersToKm(stats.ytd_run_totals.distance),
          totalRuns: stats.all_run_totals.count,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching running data:", error);
        setRunningData((prev) => ({
          ...prev,
          loading: false,
          error: "Unable to load running stats",
        }));
      }
    };

    fetchRunningData();
  }, []);

  const handleWidgetClick = async () => {
    if (!isExpanded && !monthlyStats && !loadingDetails) {
      setLoadingDetails(true);
      try {
        const stats = await stravaService.getMonthlyStats();
        setMonthlyStats(stats);
      } catch (error) {
        console.error("Error fetching monthly stats:", error);
      }
      setLoadingDetails(false);
    }
    setIsExpanded(!isExpanded);
  };

  const handleStravaLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent widget expansion
    const profileUrl = stravaService.getProfileUrl(athleteData?.username);
    window.open(profileUrl, "_blank", "noopener,noreferrer");
  };

  if (runningData.loading) {
    return (
      <div className="running-widget loading">
        <div className="running-icon">
          <RunningIcon size={28} className="loading-icon" />
        </div>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  if (runningData.error) {
    return (
      <div className="running-widget error">
        <div className="running-icon">
          <RunningIcon size={28} />
        </div>
        <div className="error-message">Stats unavailable</div>
      </div>
    );
  }

  return (
    <div
      className={`running-widget ${isExpanded ? "expanded" : ""}`}
      onClick={handleWidgetClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleWidgetClick();
        }
      }}
      aria-label="Click to expand running statistics"
    >
      <div className="running-content">
        <div className="running-icon">
          <RunningIcon size={32} />
        </div>
        <div className="running-info">
          <div className="running-quote">
            "What <span className="highlight-coffee">coffee</span> is for
            others, <span className="highlight-running">running</span> is for
            me"
          </div>
          <div className="running-stats">
            <span className="stat">
              <strong>{runningData.totalKm}</strong> KM Total
            </span>
            <span className="stat-divider">•</span>
            <span className="stat">
              <strong>{runningData.thisYearKm}</strong> This Year
            </span>
            <span className="stat-divider">•</span>
            <span className="stat">
              <strong>{runningData.totalRuns}</strong> Runs
            </span>
          </div>
        </div>
        <div className="widget-controls">
          <button
            className="strava-link-btn"
            onClick={handleStravaLinkClick}
            aria-label="Visit Strava profile"
            title="View on Strava"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066M7.613 17.944L2.464 7.772h3.065l2.084 4.116L9.677 7.772h3.066" />
            </svg>
          </button>
          <div className={`expand-indicator ${isExpanded ? "expanded" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      <div className={`expanded-content ${isExpanded ? "visible" : ""}`}>
        {loadingDetails ? (
          <div className="loading-expanded">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span>Loading detailed stats...</span>
          </div>
        ) : monthlyStats ? (
          <div className="detailed-stats">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value streak">
                  {monthlyStats.currentStreak}
                </div>
                <div className="stat-label">Current Streak</div>
                <div className="stat-unit">days</div>
              </div>

              <div className="stat-item">
                <div className="stat-value">{monthlyStats.longestStreak}</div>
                <div className="stat-label">Longest Streak</div>
                <div className="stat-unit">days</div>
              </div>

              <div className="stat-item">
                <div className="stat-value">{monthlyStats.runsThisMonth}</div>
                <div className="stat-label">This Month</div>
                <div className="stat-unit">runs</div>
              </div>

              <div className="stat-item">
                <div className="stat-value">
                  {monthlyStats.distanceThisMonth}
                </div>
                <div className="stat-label">Monthly KM</div>
                <div className="stat-unit">distance</div>
              </div>

              <div className="stat-item">
                <div className="stat-value pace">
                  {monthlyStats.avgPaceThisMonth}
                </div>
                <div className="stat-label">Avg Pace</div>
                <div className="stat-unit">min/km</div>
              </div>

              <div className="stat-item cta">
                <button
                  className="follow-strava-btn"
                  onClick={handleStravaLinkClick}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066M7.613 17.944L2.464 7.772h3.065l2.084 4.116L9.677 7.772h3.066" />
                  </svg>
                  Follow on Strava
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="expanded-placeholder">
            <span>Click to load detailed statistics</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RunningWidget;
