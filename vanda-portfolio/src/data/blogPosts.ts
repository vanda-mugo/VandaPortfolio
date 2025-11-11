export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: number;
  tags: string[];
  image?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "javascript-event-loop-async",
    title:
      "Demystifying JavaScript's Event Loop: How a Single-Threaded Language Handles Asynchronous Operations",
    excerpt:
      "Explore the fascinating world of JavaScript's event loop and discover how this single-threaded language manages concurrent operations through its ingenious asynchronous model. Learn about the call stack, callback queue, microtasks, and the mechanics that power modern web applications.",
    date: "2025-11-11",
    category: "JavaScript",
    readTime: 12,
    tags: [
      "JavaScript",
      "EventLoop",
      "Asynchronous",
      "Concurrency",
      "WebAPI",
      "NodeJS",
    ],
    content: `# Demystifying JavaScript's Event Loop: How a Single-Threaded Language Handles Asynchronous Operations

## Introduction

One of the most fascinating aspects of JavaScript is its ability to handle asynchronous operations despite being a **single-threaded** programming language. Unlike traditional multi-threaded languages like Java or C++, JavaScript achieves concurrency through an elegant mechanism called the **Event Loop**. Understanding this concept is crucial for any JavaScript developer, as it forms the foundation of how modern web applications handle everything from API calls to user interactions.

## The Single-Threaded Nature of JavaScript

### What Does Single-Threaded Mean?

In programming, a **thread** is the smallest unit of execution that a CPU can process. When we say JavaScript is single-threaded, we mean:

- **One Call Stack**: JavaScript has only one call stack, meaning it can execute one operation at a time
- **Synchronous Execution**: Code executes line by line, in order
- **Blocking Behavior**: Long-running operations would block the entire program

\`\`\`javascript
// This is synchronous, blocking code
console.log('First');
console.log('Second');
console.log('Third');

// Output:
// First
// Second
// Third
\`\`\`

### The Problem with Single-Threading

Imagine if JavaScript executed everything synchronously:

\`\`\`javascript
console.log('Start');

// This would freeze the entire browser for 3 seconds!
const data = fetchDataFromServer(); // Takes 3 seconds

console.log('End');
\`\`\`

During those 3 seconds:
- The UI would freeze
- No user interactions would work
- No other code could execute
- The application would appear broken

This is where JavaScript's **asynchronous model** comes to the rescue.

---

## Understanding Data Structures: Stack vs Queue

Before diving into the event loop, we need to understand two fundamental data structures that power JavaScript's execution model:

### The Stack (LIFO - Last In, First Out)

A **stack** is like a stack of plates - you can only add or remove from the top.

\`\`\`
Operations:
1. PUSH - Add to top
2. POP  - Remove from top

Visual Example:
     
     [3] ← Top (most recent)
     [2]
     [1] ← Bottom (oldest)
     
Push(4):        Pop():
     [4] ← New    [3] ← Returns 3
     [3]          [2]
     [2]          [1]
     [1]
\`\`\`

**Call Stack Example:**

\`\`\`javascript
function first() {
  console.log('First function');
  second();
  console.log('First function end');
}

function second() {
  console.log('Second function');
  third();
  console.log('Second function end');
}

function third() {
  console.log('Third function');
}

first();

// Call Stack Evolution:
// Step 1: [first]
// Step 2: [first, second]
// Step 3: [first, second, third]
// Step 4: [first, second]        <- third() pops off
// Step 5: [first]                <- second() pops off
// Step 6: []                     <- first() pops off
\`\`\`

### The Queue (FIFO - First In, First Out)

A **queue** is like a line at a store - first person in is the first served.

\`\`\`
Operations:
1. ENQUEUE - Add to back
2. DEQUEUE - Remove from front

Visual Example:

Front [1] [2] [3] [4] ← Back

Enqueue(5):              Dequeue():
Front [1] [2] [3] [4] [5] Back    Front [2] [3] [4] [5] Back
                                  Returns: 1
\`\`\`

**Why This Matters:**

- **Call Stack = Stack**: Functions execute in LIFO order (last called, first executed)
- **Callback Queue = Queue**: Callbacks execute in FIFO order (first scheduled, first executed)
- **Event Loop** moves items from Queue → Stack when stack is empty

---

## The JavaScript Runtime Environment

To understand how JavaScript handles asynchronous operations, we need to understand its runtime environment, which consists of several key components:

### 1. **The Call Stack (LIFO)**

The call stack is a **stack data structure** that records where in the program we are. When a function is called, it's **pushed** onto the stack. When it returns, it's **popped** off.

\`\`\`javascript
function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  const result = square(n);
  console.log(result);
}

printSquare(4);

// Call Stack Execution:
// 1. printSquare(4)
// 2. square(4)
// 3. multiply(4, 4)
// 4. multiply returns 16
// 5. square returns 16
// 6. console.log(16)
// 7. printSquare completes
\`\`\`

### 2. **Web APIs (Browser) / C++ APIs (Node.js)**

**Critical Understanding**: These are NOT part of the JavaScript engine (V8, SpiderMonkey, etc.)! They're provided by the **runtime environment**.

**Browser Web APIs:**
- \`setTimeout\` / \`setInterval\` - Timer functions
- \`fetch\` / \`XMLHttpRequest\` - HTTP requests
- DOM APIs - \`addEventListener\`, \`querySelector\`
- Storage APIs - \`localStorage\`, \`IndexedDB\`
- \`WebSockets\` - Real-time communication
- \`Geolocation\` - Location services

**Node.js C++ APIs:**
- \`fs\` - File System operations
- \`http\` / \`https\` - Server operations
- \`crypto\` - Cryptographic functions
- \`timers\` - setTimeout, setInterval
- \`child_process\` - Spawn processes

**Key Point**: These APIs can execute operations **outside** of the JavaScript thread using separate threads provided by the browser/Node.js!

### 3. **The Callback Queue / Macrotask Queue (FIFO)**

The callback queue is a **queue data structure** where callbacks from Web APIs wait to be executed.

**What Goes Here:**
- \`setTimeout\` callbacks
- \`setInterval\` callbacks
- I/O operations (file reading, network requests)
- UI rendering tasks
- \`setImmediate\` (Node.js)

**How It Works:**

\`\`\`javascript
// Example showing queue behavior
setTimeout(() => console.log('First timeout'), 0);
setTimeout(() => console.log('Second timeout'), 0);
setTimeout(() => console.log('Third timeout'), 0);

// Callback Queue (FIFO):
// [callback1, callback2, callback3]
//     ↓
// Execute callback1 first (FIFO)
// Then callback2
// Then callback3
\`\`\`

### 4. **The Microtask Queue (FIFO - Higher Priority)**

A special **queue** for high-priority callbacks. **Always** processed before macrotasks!

**What Goes Here:**
- Promise \`.then()\`, \`.catch()\`, \`.finally()\`
- \`async\`/\`await\` (which uses Promises)
- \`queueMicrotask()\`
- \`MutationObserver\` callbacks
- \`process.nextTick()\` (Node.js - even higher priority)

**Priority Example:**

\`\`\`javascript
setTimeout(() => console.log('Macrotask'), 0);
Promise.resolve().then(() => console.log('Microtask'));

// Even though setTimeout is first, microtask executes first!
// Output:
// Microtask
// Macrotask
\`\`\`

### 5. **The Event Loop - The Orchestrator**

The event loop is a **continuously running process** that coordinates everything. Think of it as a traffic controller managing the flow of execution.

**Event Loop Responsibilities:**

1. **Check Call Stack**: Is it empty?
2. **Process Microtasks**: Execute ALL microtasks (Promises)
3. **Process One Macrotask**: Execute ONE callback from callback queue
4. **Render**: Update UI if needed (browser only)
5. **Repeat**: Go back to step 1

**Important**: The event loop **never stops** - it's always monitoring and coordinating!

---

## Deep Dive: How Web APIs Interact with Queues

Let's trace a complete asynchronous operation from start to finish:

### Example: setTimeout Journey

\`\`\`javascript
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 2000);

console.log('End');
\`\`\`

**Step-by-Step Execution:**

\`\`\`
T=0ms:
  Call Stack: [main script]
  Web API: []
  Callback Queue: []
  Output: "Start"

T=1ms:
  Call Stack: [main script, setTimeout]
  Web API: []
  Callback Queue: []
  
  Action: setTimeout() is called
  - setTimeout is a Web API function
  - JavaScript says: "Browser, start a 2000ms timer and callback when done"
  - setTimeout() immediately returns (non-blocking!)

T=2ms:
  Call Stack: [main script]
  Web API: [Timer: 1998ms remaining, callback: () => {...}]
  Callback Queue: []
  Output: "End"
  
  Action: Main script continues executing

T=3ms:
  Call Stack: []
  Web API: [Timer: 1997ms remaining, callback: () => {...}]
  Callback Queue: []
  
  Action: Main script completes, call stack empty

T=2000ms:
  Call Stack: []
  Web API: [Timer: COMPLETE! ✓]
  Callback Queue: [() => { console.log('Timeout callback'); }]
  
  Action: Timer completes in Web API
  - Web API enqueues callback to Callback Queue
  - Web API's job is done

T=2001ms:
  Call Stack: []
  Web API: []
  Callback Queue: [() => { console.log('Timeout callback'); }]
  
  Event Loop thinks: 
  "Call stack empty? ✓"
  "Microtasks done? ✓" 
  "Callback queue has work? ✓"
  "Let's move callback to call stack!"

T=2002ms:
  Call Stack: [timeout callback]
  Web API: []
  Callback Queue: []
  Output: "Timeout callback"
  
  Action: Callback executes and completes
\`\`\`

### Example: Fetch with Promises (More Complex)

\`\`\`javascript
console.log('1: Start');

fetch('https://api.example.com/data')
  .then(response => {
    console.log('2: Got response');
    return response.json();
  })
  .then(data => {
    console.log('3: Parsed data');
  });

console.log('4: End');
\`\`\`

**Detailed Execution Flow:**

\`\`\`
T=0ms:
  Call Stack: [main]
  Web API: []
  Microtask Queue: []
  Callback Queue: []
  Output: "1: Start"

T=1ms:
  Call Stack: [main, fetch()]
  
  Action: fetch() called
  - fetch() is a Web API
  - Creates a Promise (pending state)
  - Tells browser: "Make HTTP request"
  - Returns Promise immediately (non-blocking!)

T=2ms:
  Call Stack: [main, .then()]
  Web API: [HTTP Request in progress...]
  Promise: Pending
  
  Action: .then() called
  - Registers callback for when Promise resolves
  - Returns new Promise
  - Continues execution

T=3ms:
  Call Stack: [main]
  Web API: [HTTP Request in progress...]
  Output: "4: End"
  
  Action: Main script completes

T=150ms: (Network response received)
  Call Stack: []
  Web API: [HTTP Request COMPLETE ✓, Response ready]
  Microtask Queue: []
  
  Action: HTTP request completes
  - Web API resolves the Promise
  - Promise resolution queues .then() callback to Microtask Queue

T=151ms:
  Call Stack: []
  Web API: []
  Microtask Queue: [() => { console.log('2: Got response'); ...}]
  
  Event Loop: "Call stack empty! Process microtasks!"

T=152ms:
  Call Stack: [then callback 1]
  Output: "2: Got response"
  
  Action: First .then() executes
  - Returns response.json() (another Promise)
  - Parsing happens (may be synchronous if small)

T=153ms:
  Call Stack: []
  Microtask Queue: [() => { console.log('3: Parsed data'); }]
  
  Action: response.json() Promise resolves
  - Second .then() callback queued to Microtask Queue

T=154ms:
  Call Stack: [then callback 2]
  Output: "3: Parsed data"
  
  Action: Second .then() executes and completes
\`\`\`

**Key Observations:**

1. **Web APIs work concurrently**: While HTTP request happens, JavaScript continues executing
2. **Promises use Microtask Queue**: That's why they execute before setTimeout
3. **Event Loop never blocks**: It keeps checking and coordinating
4. **Callbacks queue up**: Multiple callbacks can wait in their respective queues

---

## The Event Loop: Complete Algorithm Explained

The Event Loop is a **continuously running process** that orchestrates code execution. Here's the precise algorithm:

### Detailed Event Loop Algorithm

\`\`\`javascript
// Pseudocode for Event Loop
while (true) {
  // ===== PHASE 1: Execute Synchronous Code =====
  // Run everything on the call stack to completion
  while (callStack.hasFrames()) {
    const frame = callStack.pop();  // LIFO - Last In, First Out
    execute(frame);
  }
  
  // ===== PHASE 2: Process ALL Microtasks =====
  // Empty the entire microtask queue
  // Note: New microtasks added during this phase are also executed!
  while (microtaskQueue.hasTasks()) {
    const microtask = microtaskQueue.dequeue();  // FIFO
    callStack.push(microtask);
    execute(microtask);
    
    // If microtask adds more microtasks, they execute too!
    // This is why Promises can starve the event loop
  }
  
  // ===== PHASE 3: Execute ONE Macrotask =====
  // Only ONE task from callback queue per loop iteration
  if (callbackQueue.hasTasks()) {
    const macrotask = callbackQueue.dequeue();  // FIFO
    callStack.push(macrotask);
    execute(macrotask);
  }
  
  // ===== PHASE 4: Render (Browser Only) =====
  // Update UI if needed (approximately every 16ms for 60fps)
  if (isInBrowser && needsRender()) {
    render();
    
    // Check microtasks again after render
    while (microtaskQueue.hasTasks()) {
      execute(microtaskQueue.dequeue());
    }
  }
  
  // ===== PHASE 5: Check Idle =====
  // If all queues empty, wait for new tasks
  if (callStack.isEmpty() && 
      microtaskQueue.isEmpty() && 
      callbackQueue.isEmpty()) {
    waitForTasks();  // Browser waits for user input, timers, etc.
  }
  
  // Loop continues infinitely...
}
\`\`\`

### Critical Rules

**Rule 1: Stack Must Be Empty**
The event loop can only move callbacks from queues to the stack when the stack is completely empty.

\`\`\`javascript
// Long-running synchronous code blocks everything
console.log('Start');

// This blocks for ~5 seconds
for (let i = 0; i < 5000000000; i++) {
  // Busy loop
}

console.log('End');

// During this loop:
// - No callbacks execute
// - UI is frozen
// - Event loop waits
\`\`\`

**Rule 2: Microtasks Have Priority**
ALL microtasks execute before ANY macrotask.

\`\`\`javascript
setTimeout(() => console.log('Macro 1'), 0);
setTimeout(() => console.log('Macro 2'), 0);

Promise.resolve().then(() => console.log('Micro 1'));
Promise.resolve().then(() => console.log('Micro 2'));

// Output:
// Micro 1
// Micro 2
// Macro 1
// Macro 2
\`\`\`

**Rule 3: Microtasks Can Starve Macrotasks**
If microtasks keep adding more microtasks, macrotasks never execute!

\`\`\`javascript
// WARNING: This starves the event loop!
function infiniteMicrotasks() {
  Promise.resolve().then(() => {
    console.log('Microtask');
    infiniteMicrotasks();  // Adds another microtask
  });
}

infiniteMicrotasks();

// This setTimeout NEVER executes because microtasks never finish!
setTimeout(() => {
  console.log('This never runs!');
}, 0);
\`\`\`

**Rule 4: One Macrotask Per Iteration**
Only ONE macrotask executes per event loop iteration.

\`\`\`javascript
setTimeout(() => console.log('Macro 1'), 0);
setTimeout(() => console.log('Macro 2'), 0);
setTimeout(() => console.log('Macro 3'), 0);

// Event Loop Iterations:
// Iteration 1: Execute Macro 1, check microtasks, maybe render
// Iteration 2: Execute Macro 2, check microtasks, maybe render
// Iteration 3: Execute Macro 3, check microtasks, maybe render
\`\`\`

### Why This Design?

**Responsiveness**: Processing one macrotask at a time allows the browser to render between tasks, keeping the UI responsive.

**Priority**: Microtasks (Promises) are for quick, immediate work that should happen before the next render or I/O operation.

**Predictability**: FIFO queues ensure callbacks execute in the order they were added.

---

## Complete Execution Flow Visualization

Here's how all components work together:

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  JavaScript Code Execution                                   │
│  ┌───────────────────────────────┐                          │
│  │                                │                          │
│  │  Call Stack (LIFO)            │                          │
│  │  ┌──────────────────┐         │                          │
│  │  │  function3()     │  ← Top  │                          │
│  │  ├──────────────────┤         │                          │
│  │  │  function2()     │         │                          │
│  │  ├──────────────────┤         │                          │
│  │  │  function1()     │         │                          │
│  │  └──────────────────┘         │                          │
│  │                                │                          │
│  └───────────────────────────────┘                          │
│              ↓                                                │
│    Calls Web API (setTimeout, fetch, etc.)                  │
│              ↓                                                │
└──────────────┼───────────────────────────────────────────────┘
               │
               ↓
┌──────────────┼───────────────────────────────────────────────┐
│              ↓                                                │
│  Web APIs / C++ APIs (Separate Threads!)                    │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  Timer: 2000ms  │  │  HTTP Request   │                  │
│  │  callback: fn   │  │  In Progress... │                  │
│  └─────────────────┘  └─────────────────┘                  │
│         │                     │                              │
│         │ Timer Complete!     │ Response Received!          │
│         ↓                     ↓                              │
└─────────┼─────────────────────┼───────────────────────────-─┘
          │                     │
          ↓                     ↓
┌─────────┼─────────────────────┼───────────────────────────-─┐
│         ↓                     ↓                              │
│  ┌──────────────────┐  ┌──────────────────┐                │
│  │ Callback Queue   │  │ Microtask Queue  │                │
│  │ (Macrotasks)     │  │ (Higher Priority)│                │
│  │ FIFO             │  │ FIFO             │                │
│  ├──────────────────┤  ├──────────────────┤                │
│  │ timer callback   │  │ Promise.then()   │                │
│  │ click callback   │  │ Promise.then()   │                │
│  │ I/O callback     │  │ queueMicrotask() │                │
│  └──────────────────┘  └──────────────────┘                │
│         ↑                     ↑                              │
│         │                     │                              │
│         └──────── Event Loop ─┘                             │
│                      ↓                                       │
│              ┌───────────────┐                              │
│              │ When to move? │                              │
│              ├───────────────┤                              │
│              │ 1. Stack empty│                              │
│              │ 2. Microtasks │                              │
│              │    first!     │                              │
│              │ 3. Then ONE   │                              │
│              │    macrotask  │                              │
│              └───────────────┘                              │
│                                                               │
└──────────────────────────────────────────────────────────────┘
\`\`\`

### Numbered Execution Example

\`\`\`javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
  .then(() => console.log('3'))
  .then(() => console.log('4'));

setTimeout(() => console.log('5'), 0);

console.log('6');
\`\`\`

**Timeline:**

\`\`\`
Time  | Call Stack        | Web API      | Microtask Q | Callback Q | Output
------|-------------------|--------------|-------------|------------|--------
0ms   | [main]           | []           | []          | []         | "1"
1ms   | [main]           | [timer:0ms]  | []          | []         |
2ms   | [main]           | [timer:0ms]  | [then1]     | []         |
3ms   | [main]           | [2 timers]   | [then1]     | []         |
4ms   | [main]           | [2 timers]   | [then1]     | []         | "6"
5ms   | []               | []           | [then1]     | [cb1, cb2] |
6ms   | [then1]          | []           | []          | [cb1, cb2] | "3"
7ms   | []               | []           | [then2]     | [cb1, cb2] |
8ms   | [then2]          | []           | []          | [cb1, cb2] | "4"
9ms   | []               | []           | []          | [cb1, cb2] |
10ms  | [callback1]      | []           | []          | [cb2]      | "2"
11ms  | []               | []           | []          | [cb2]      |
12ms  | [callback2]      | []           | []          | []         | "5"
\`\`\`

**Output Order: 1, 6, 3, 4, 2, 5**

### Visual Breakdown

\`\`\`
┌───────────────────────────┐
│   JavaScript Call Stack   │ ← Single thread executes here
└───────────────────────────┘
            ↑
            │ Event Loop moves callbacks here
            │
┌───────────────────────────┐
│   Microtask Queue         │ ← Promises, queueMicrotask
│   (Higher Priority)       │
└───────────────────────────┘
            ↑
            │
┌───────────────────────────┐
│   Callback Queue          │ ← setTimeout, setInterval, I/O
│   (Macrotask Queue)       │
└───────────────────────────┘
            ↑
            │ Callbacks added when operations complete
            │
┌───────────────────────────┐
│   Web APIs / Node APIs    │ ← Operations execute here
│   (Separate Threads)      │    (outside JavaScript thread!)
└───────────────────────────┘
\`\`\`

---

## Practical Examples

### Example 1: setTimeout

\`\`\`javascript
console.log('1: Start');

setTimeout(() => {
  console.log('2: Inside setTimeout');
}, 0);

console.log('3: End');

// Output:
// 1: Start
// 3: End
// 2: Inside setTimeout
\`\`\`

**Why does setTimeout execute last, even with 0ms delay?**

1. \`console.log('1: Start')\` executes (call stack)
2. \`setTimeout\` is encountered → callback sent to Web API
3. \`console.log('3: End')\` executes (call stack)
4. Call stack is now empty
5. Event loop checks microtask queue (empty)
6. Event loop moves setTimeout callback to call stack
7. \`console.log('2: Inside setTimeout')\` executes

### Example 2: Promises vs setTimeout

\`\`\`javascript
console.log('1: Start');

setTimeout(() => {
  console.log('2: setTimeout');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3: Promise 1');
  })
  .then(() => {
    console.log('4: Promise 2');
  });

console.log('5: End');

// Output:
// 1: Start
// 5: End
// 3: Promise 1
// 4: Promise 2
// 2: setTimeout
\`\`\`

**Why do Promises execute before setTimeout?**

- Promises use the **Microtask Queue** (higher priority)
- setTimeout uses the **Callback Queue** (lower priority)
- Event loop processes ALL microtasks before ANY macrotask

### Example 3: Complex Scenario

\`\`\`javascript
console.log('1: Script start');

setTimeout(() => {
  console.log('2: setTimeout 1');
  Promise.resolve().then(() => {
    console.log('3: Promise inside setTimeout');
  });
}, 0);

Promise.resolve()
  .then(() => {
    console.log('4: Promise 1');
    setTimeout(() => {
      console.log('5: setTimeout inside Promise');
    }, 0);
  })
  .then(() => {
    console.log('6: Promise 2');
  });

setTimeout(() => {
  console.log('7: setTimeout 2');
}, 0);

console.log('8: Script end');

// Output:
// 1: Script start
// 8: Script end
// 4: Promise 1
// 6: Promise 2
// 2: setTimeout 1
// 3: Promise inside setTimeout
// 7: setTimeout 2
// 5: setTimeout inside Promise
\`\`\`

**Step-by-step execution:**

1. Synchronous code executes: logs 1, 8
2. Microtask queue processes: logs 4, 6
3. First macrotask (setTimeout 1): logs 2, then adds Promise to microtask queue
4. Microtask queue processes: logs 3
5. Second macrotask (setTimeout 2): logs 7
6. Third macrotask (setTimeout from Promise): logs 5

---

## Async/Await: Syntactic Sugar Over Promises

\`\`\`javascript
// Using Promises
function fetchData() {
  return fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

// Using Async/Await (much cleaner!)
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

**Key Points:**
- \`async\` functions always return a Promise
- \`await\` pauses execution until Promise resolves
- Still non-blocking! Other code can run while waiting

---

## Common Pitfalls and Best Practices

### Pitfall 1: Creating Blocking Code with Async

\`\`\`javascript
// ❌ BAD: Sequential requests (slow!)
async function fetchAllUsers() {
  const user1 = await fetch('/api/user/1');
  const user2 = await fetch('/api/user/2');
  const user3 = await fetch('/api/user/3');
  return [user1, user2, user3];
}

// ✅ GOOD: Parallel requests (fast!)
async function fetchAllUsers() {
  const [user1, user2, user3] = await Promise.all([
    fetch('/api/user/1'),
    fetch('/api/user/2'),
    fetch('/api/user/3')
  ]);
  return [user1, user2, user3];
}
\`\`\`

### Pitfall 2: Forgetting Error Handling

\`\`\`javascript
// ❌ BAD: Unhandled promise rejection
async function riskyOperation() {
  const data = await fetch('/api/data'); // Might fail!
  return data.json();
}

// ✅ GOOD: Proper error handling
async function riskyOperation() {
  try {
    const data = await fetch('/api/data');
    if (!data.ok) {
      throw new Error(\`HTTP error! status: \${data.status}\`);
    }
    return await data.json();
  } catch (error) {
    console.error('Operation failed:', error);
    throw error; // Re-throw or handle appropriately
  }
}
\`\`\`

### Pitfall 3: Not Understanding Promise Chaining

\`\`\`javascript
// ❌ BAD: Lost error handling
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
// If this fails, error is lost!

// ✅ GOOD: Proper error handling
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Request failed:', error);
  })
  .finally(() => {
    console.log('Request completed');
  });
\`\`\`

---

## Performance Considerations

### Understanding the Cost of Context Switching

While JavaScript is single-threaded, the event loop does introduce overhead:

\`\`\`javascript
// CPU-intensive task (blocks event loop)
function calculatePrimes(max) {
  const primes = [];
  for (let i = 2; i < max; i++) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  return primes;
}

// This blocks the entire application!
const primes = calculatePrimes(100000);
\`\`\`

**Solutions:**
1. **Web Workers** (Browser): Run CPU-intensive tasks in separate threads
2. **Worker Threads** (Node.js): Similar to Web Workers
3. **Break into chunks**: Use \`setTimeout\` to yield control

\`\`\`javascript
// Breaking into chunks
async function calculatePrimesAsync(max, chunkSize = 1000) {
  const primes = [];
  
  for (let i = 2; i < max; i += chunkSize) {
    await new Promise(resolve => setTimeout(resolve, 0));
    
    for (let num = i; num < Math.min(i + chunkSize, max); num++) {
      let isPrime = true;
      for (let j = 2; j < num; j++) {
        if (num % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) primes.push(num);
    }
  }
  
  return primes;
}
\`\`\`

---

## Real-World Applications

### Example: Building a Rate-Limited API Client

\`\`\`javascript
class RateLimitedAPI {
  constructor(maxRequestsPerSecond = 10) {
    this.maxRequests = maxRequestsPerSecond;
    this.queue = [];
    this.processing = false;
  }

  async request(url, options = {}) {
    return new Promise((resolve, reject) => {
      this.queue.push({ url, options, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const batchSize = Math.min(this.maxRequests, this.queue.length);
      const batch = this.queue.splice(0, batchSize);
      
      await Promise.all(
        batch.map(async ({ url, options, resolve, reject }) => {
          try {
            const response = await fetch(url, options);
            resolve(response);
          } catch (error) {
            reject(error);
          }
        })
      );
      
      // Wait 1 second before next batch
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    this.processing = false;
  }
}

// Usage
const api = new RateLimitedAPI(5); // 5 requests per second

for (let i = 0; i < 20; i++) {
  api.request(\`/api/data/\${i}\`)
    .then(response => console.log(\`Request \${i} completed\`))
    .catch(error => console.error(\`Request \${i} failed\`, error));
}
\`\`\`

---

## Conclusion

JavaScript's event loop is a masterpiece of engineering that enables a single-threaded language to handle concurrent operations efficiently. By understanding how the call stack, Web APIs, callback queue, and microtask queue work together, you can:

1. **Write more efficient code** by leveraging asynchronous patterns
2. **Avoid common pitfalls** like blocking the event loop
3. **Debug complex timing issues** with confidence
4. **Optimize application performance** through proper async handling

### Key Takeaways

✅ JavaScript is single-threaded but achieves concurrency through asynchronous operations  
✅ The Event Loop coordinates between the call stack and various queues  
✅ Microtasks (Promises) have higher priority than macrotasks (setTimeout)  
✅ Web APIs execute outside the JavaScript thread, enabling true parallelism  
✅ Always handle errors in async operations  
✅ Use Promise.all() for parallel operations when possible  
✅ Break CPU-intensive tasks into chunks or use Web Workers  

### Further Reading

- [MDN: Concurrency model and Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [JavaScript.info: Event Loop](https://javascript.info/event-loop)
- [Philip Roberts: What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

---

*Have questions or insights about the event loop? Feel free to reach out! I'd love to discuss JavaScript's asynchronous model and hear about your experiences.*
`,
  },
];
