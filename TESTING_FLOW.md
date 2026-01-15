# Testing Flow Guide - Competition Platform

This comprehensive guide provides step-by-step instructions to test all features of the Competition Platform, including all new features.

**NOTE:** The system uses `username` (String) as the unique identifier instead of numeric IDs.

## 🚀 Step 0: Start the Application

First, open a terminal and run:

```bash
cd "/Users/mkzabout/Downloads/final project"
mvn spring-boot:run
```

Wait until you see: `Started CompetitionPlatformApplication`

The application comes with pre-loaded sample data (3 users, 4 tracks, 3 competitions).

---

## 📝 Complete Testing Flow

### Step 1: Register New Users

```bash
# Register User 1: Alice
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "username": "alice",
    "bio": "Learning enthusiast"
  }'

# Register User 2: Bob
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bob Martin",
    "username": "bob",
    "bio": "Developer and teacher"
  }'

# Register User 3: Charlie
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Charlie Brown",
    "username": "charlie",
    "bio": "Competitive learner"
  }'
```

**Expected Response:**
```json
{
  "username": "alice",
  "name": "Alice Johnson",
  "bio": "Learning enthusiast",
  "followerCount": 0,
  "followingCount": 0,
  "totalScore": 0,
  "competitionsCompleted": 0,
  "tracksAttempted": 0,
  "favoriteTracksCount": 0,
  "completedCompetitions": [],
  "attemptedTracks": [],
  "favoriteTracks": []
}
```

---

### Step 2: View User Profiles (Enhanced with Detailed Stats)

```bash
# Get Alice's full profile
curl http://localhost:8080/users/alice

# Get pre-existing user "johndoe" profile
curl http://localhost:8080/users/johndoe
```

**New Response Fields:**
- `tracksAttempted`: Number of tracks user has participated in
- `favoriteTracksCount`: Number of favorite tracks
- `completedCompetitions`: List of completed competitions with scores and percentages
- `attemptedTracks`: List of tracks with competition counts
- `favoriteTracks`: List of favorited tracks

---

### Step 3: Follow/Unfollow Users

```bash
# Alice follows johndoe
curl -X POST "http://localhost:8080/users/johndoe/follow?follower=alice"

# Alice follows Bob
curl -X POST "http://localhost:8080/users/bob/follow?follower=alice"

# View Alice's following list
curl http://localhost:8080/users/alice/following

# View johndoe's followers
curl http://localhost:8080/users/johndoe/followers

# Alice unfollows Bob
curl -X DELETE "http://localhost:8080/users/bob/follow?follower=alice"
```

---

### Step 4: 
 and View Tracks (with Background Color)

```bash
# CREATE A NEW TRACK with backgroundColor
curl -X POST http://localhost:8080/tracks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Web Development",
    "description": "Learn HTML, CSS, JavaScript and modern frameworks",
    "backgroundColor": "#9b59b6"
  }'

# CREATE another track
curl -X POST http://localhost:8080/tracks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Data Science",
    "description": "Learn data analysis, machine learning and AI",
    "backgroundColor": "#1abc9c"
  }'

# Get all available tracks
curl http://localhost:8080/tracks

# Get specific track
curl http://localhost:8080/tracks/1
```

**Expected Response (includes backgroundColor):**
```json
{
  "id": 5,
  "name": "Web Development",
  "description": "Learn HTML, CSS, JavaScript and modern frameworks",
  "backgroundColor": "#9b59b6"
}
```

---

### Step 5: Favorite Tracks (NEW FEATURE)

```bash
# Alice adds Programming track (id=3) to favorites
curl -X POST "http://localhost:8080/tracks/3/favorite?username=alice"

# Alice adds Mathematics track (id=2) to favorites
curl -X POST "http://localhost:8080/tracks/2/favorite?username=alice"

# Check if track is in favorites
curl "http://localhost:8080/tracks/3/is-favorite?username=alice"
# Expected: true

curl "http://localhost:8080/tracks/1/is-favorite?username=alice"
# Expected: false

# Get Alice's favorite tracks
curl "http://localhost:8080/tracks/favorites?username=alice"

# Remove track from favorites
curl -X DELETE "http://localhost:8080/tracks/2/favorite?username=alice"

# Verify removal
curl "http://localhost:8080/tracks/favorites?username=alice"
```

**Expected Response for favorites:**
```json
[
  {
    "id": 3,
    "name": "Programming",
    "description": "Learn programming languages...",
    "backgroundColor": "#3498db"
  }
]
```

---

### Step 6: Create Competitions

```bash
# CREATE A NEW COMPETITION WITH QUESTIONS & OPTIONS
curl -X POST http://localhost:8080/competitions \
  -H "Content-Type: application/json" \
  -d '{
    "trackId": 3,
    "name": "Advanced Java Quiz",
    "description": "Test your advanced Java skills",
    "startTime": "2025-12-20T10:00:00",
    "endTime": "2025-12-30T23:59:59",
    "questions": [
      {
        "questionText": "What is the purpose of the synchronized keyword?",
        "pointsWeight": 15,
        "options": [
          {"optionText": "Thread safety - prevents race conditions", "correct": true},
          {"optionText": "Makes code run faster", "correct": false},
          {"optionText": "Enables garbage collection", "correct": false},
          {"optionText": "Creates a new thread", "correct": false}
        ]
      },
      {
        "questionText": "Which collection is thread-safe by default?",
        "pointsWeight": 10,
        "options": [
          {"optionText": "ArrayList", "correct": false},
          {"optionText": "HashMap", "correct": false},
          {"optionText": "Vector", "correct": true},
          {"optionText": "LinkedList", "correct": false}
        ]
      }
    ]
  }'

# Get a specific competition
curl http://localhost:8080/competitions/1

# Get next upcoming competition for Programming track (id=3)
curl http://localhost:8080/tracks/3/next-competition
```

---

### Step 7: View Enrolled Users (NEW FEATURE)

```bash
# First, enroll some users in Competition 1
curl -X POST "http://localhost:8080/competitions/1/enroll?username=alice"
curl -X POST "http://localhost:8080/competitions/1/enroll?username=bob"
curl -X POST "http://localhost:8080/competitions/1/enroll?username=charlie"

# Get all enrolled users for Competition 1
curl http://localhost:8080/competitions/1/enrolled-users

# Get all users enrolled in Programming track (id=3)
curl http://localhost:8080/tracks/3/enrolled-users
```

**Expected Response:**
```json
[
  {
    "username": "alice",
    "name": "Alice Johnson",
    "bio": "Learning enthusiast"
  },
  {
    "username": "bob",
    "name": "Bob Martin",
    "bio": "Developer and teacher"
  },
  {
    "username": "charlie",
    "name": "Charlie Brown",
    "bio": "Competitive learner"
  }
]
```

---

### Step 8: Get Competition Questions & Submit Answers (with Percentage)

```bash
# Get questions for Competition 1 (only works if currently active)
curl http://localhost:8080/competitions/1/questions

# Submit Alice's answers
curl -X POST http://localhost:8080/competitions/1/submit \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "answers": [
      {"questionId": 1, "selectedOptionId": 1},
      {"questionId": 2, "selectedOptionId": 6},
      {"questionId": 3, "selectedOptionId": 10}
    ]
  }'
```

**Expected Response (with NEW percentage field):**
```json
{
  "totalScore": 35,
  "correctAnswers": 3,
  "totalQuestions": 3,
  "percentage": 100.0,
  "completedAt": "2025-12-28T14:30:00"
}
```

---

### Step 9: Get Next Competition for User (NEW FEATURE)

```bash
# Get next upcoming competition for Alice (in tracks she's attempted)
curl "http://localhost:8080/competitions/next?username=alice"

# Get all available competitions Alice hasn't enrolled in
curl "http://localhost:8080/competitions/available?username=alice"

# Get upcoming competitions in Alice's attempted tracks
curl "http://localhost:8080/competitions/upcoming?username=alice"
```

---

### Step 10: Check User Profile (with Completed Competitions)

```bash
# Check Alice's profile after completing a competition
curl http://localhost:8080/users/alice
```

**Expected Response (with detailed competition history):**
```json
{
  "username": "alice",
  "name": "Alice Johnson",
  "bio": "Learning enthusiast",
  "followerCount": 0,
  "followingCount": 1,
  "totalScore": 35.0,
  "competitionsCompleted": 1,
  "tracksAttempted": 1,
  "favoriteTracksCount": 1,
  "completedCompetitions": [
    {
      "competitionId": 1,
      "competitionName": "Java Basics Quiz",
      "trackName": "Programming",
      "score": 35.0,
      "percentage": 100.0,
      "completedAt": "2025-12-28T14:30:00"
    }
  ],
  "attemptedTracks": [
    {
      "trackId": 3,
      "trackName": "Programming",
      "backgroundColor": "#3498db",
      "competitionsCompleted": 1
    }
  ],
  "favoriteTracks": [
    {
      "trackId": 3,
      "trackName": "Programming",
      "backgroundColor": "#3498db",
      "competitionsCompleted": 1
    }
  ]
}
```

---

### Step 11: Create Posts

```bash
# Alice creates a post about her quiz experience
curl -X POST http://localhost:8080/posts \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "content": "Just scored 35 points in the Java Basics Quiz! 🎉 #Programming",
    "trackIds": [3]
  }'

# Alice creates a post linked to the competition
curl -X POST http://localhost:8080/posts \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "content": "The Java quiz was challenging but fun! Recommend everyone to try it.",
    "competitionId": 1,
    "trackIds": [3]
  }'

# Bob creates a post about multiple topics
curl -X POST http://localhost:8080/posts \
  -H "Content-Type: application/json" \
  -d '{
    "username": "bob",
    "content": "Learning both math and programming today. Great day!",
    "trackIds": [2, 3]
  }'
```

---

### Step 12: Like/Dislike Posts (NEW USER-TRACKED FEATURE)

```bash
# Alice likes post 5 (now requires username!)
curl -X POST "http://localhost:8080/posts/5/like?username=alice"

# Bob also likes post 5
curl -X POST "http://localhost:8080/posts/5/like?username=bob"

# Charlie dislikes post 5
curl -X POST "http://localhost:8080/posts/5/dislike?username=charlie"

# Alice changes her mind and dislikes instead (toggles from like to dislike)
curl -X POST "http://localhost:8080/posts/5/dislike?username=alice"

# Alice likes again (toggles from dislike to like)
curl -X POST "http://localhost:8080/posts/5/like?username=alice"

# Alice unlikes by clicking like again (removes the like)
curl -X POST "http://localhost:8080/posts/5/like?username=alice"

# Check Alice's reaction to post 5
curl "http://localhost:8080/posts/5/reaction?username=alice"
# Expected: null (no reaction)

# Alice likes post 5 again
curl -X POST "http://localhost:8080/posts/5/like?username=alice"

# Check Alice's reaction again
curl "http://localhost:8080/posts/5/reaction?username=alice"
# Expected: "LIKE"
```

**Response includes userReaction:**
```json
{
  "id": 5,
  "username": "alice",
  "authorName": "Alice Johnson",
  "content": "Just scored 35 points...",
  "likesCount": 2,
  "dislikesCount": 1,
  "userReaction": "LIKE"
}
```

---

### Step 13: Announcements (NEW FEATURE)

```bash
# Create a new announcement (auto-expires after 1 week)
curl -X POST http://localhost:8080/announcements \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Welcome to Competition Platform!",
    "description": "We are excited to launch our new platform. Join competitions and earn points!"
  }'

# Create announcement with custom expiration
curl -X POST http://localhost:8080/announcements \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Programming Competition",
    "description": "Get ready for our biggest programming challenge on Jan 15th!",
    "expiresAt": "2025-01-20T00:00:00"
  }'

# Get all active announcements
curl http://localhost:8080/announcements

# Get ALL announcements (including expired)
curl http://localhost:8080/announcements/all

# Get specific announcement
curl http://localhost:8080/announcements/1

# Update an announcement
curl -X PUT http://localhost:8080/announcements/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated: Welcome Message",
    "description": "Welcome! Check out our new features including favorite tracks and announcements!"
  }'

# Deactivate an announcement (without deleting)
curl -X POST http://localhost:8080/announcements/1/deactivate

# Delete an announcement
curl -X DELETE http://localhost:8080/announcements/2
```

**Announcement Response:**
```json
{
  "id": 1,
  "title": "Welcome to Competition Platform!",
  "description": "We are excited to launch our new platform...",
  "createdAt": "2025-12-28T14:30:00",
  "expiresAt": "2026-01-04T14:30:00",
  "active": true
}
```

---

### Step 14: View Posts & Feeds

```bash
# Get all posts
curl http://localhost:8080/posts

# Get posts filtered by Programming track (id=3)
curl "http://localhost:8080/posts?track_id=3"

# Get posts by a specific user (alice)
curl "http://localhost:8080/posts?username=alice"

# Alternative: Get user posts using path variable
curl http://localhost:8080/posts/user/alice

# Get a specific post
curl http://localhost:8080/posts/5
```

---

### Step 15: View Tracks User Has Attempted

```bash
# Get tracks Alice has participated in
curl "http://localhost:8080/tracks?attempted_by=alice"
```

---

## 🗄️ View Database (H2 Console)

1. Open browser: http://localhost:8080/h2-console
2. Enter:
   - JDBC URL: `jdbc:h2:mem:competitiondb`
   - User Name: `sa`
   - Password: (leave empty)
3. Click "Connect"

**Useful SQL Queries:**

```sql
-- View all users
SELECT * FROM users;

-- View all tracks (with background colors)
SELECT * FROM tracks;

-- View all competitions
SELECT * FROM competitions;

-- View user enrollments with scores
SELECT u.username, c.name as competition, ce.total_score, ce.finished_at 
FROM competition_enrollments ce 
JOIN users u ON ce.user_username = u.username 
JOIN competitions c ON ce.competition_id = c.id;

-- View questions and correct answers
SELECT q.question_text, o.option_text, o.is_correct 
FROM questions q 
JOIN options o ON q.id = o.question_id 
ORDER BY q.id, o.id;

-- View all posts with user info
SELECT p.id, u.username, p.content, p.likes_count, p.dislikes_count 
FROM posts p 
JOIN users u ON p.user_username = u.username;

-- View post reactions (NEW)
SELECT pr.username, pr.post_id, pr.reaction_type, pr.created_at 
FROM post_reactions pr;

-- View favorite tracks (NEW)
SELECT ft.username, t.name as track_name, ft.added_at 
FROM favorite_tracks ft 
JOIN tracks t ON ft.track_id = t.id;

-- View announcements (NEW)
SELECT * FROM announcements ORDER BY created_at DESC;

-- View active announcements only
SELECT * FROM announcements WHERE is_active = true AND (expires_at IS NULL OR expires_at > NOW());

-- View follow relationships
SELECT f.username as follower, t.username as following 
FROM users f 
JOIN user_follows uf ON f.username = uf.follower_username 
JOIN users t ON uf.following_username = t.username;
```

---

## ⚠️ Error Scenarios to Test

```bash
# Try to register with existing username
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "username": "alice", "bio": "test"}'
# Error: Username already exists

# Try to follow yourself
curl -X POST "http://localhost:8080/users/alice/follow?follower=alice"
# Error: Users cannot follow themselves

# Try to submit answers without enrolling
curl -X POST http://localhost:8080/competitions/2/submit \
  -H "Content-Type: application/json" \
  -d '{"username": "charlie", "answers": []}'
# Error: User is not enrolled in this competition

# Try to get questions for upcoming competition (not started)
curl http://localhost:8080/competitions/2/questions
# Error: Competition has not started yet

# Try to favorite the same track twice
curl -X POST "http://localhost:8080/tracks/3/favorite?username=alice"
curl -X POST "http://localhost:8080/tracks/3/favorite?username=alice"
# Error: Track is already in favorites

# Try to remove non-favorited track
curl -X DELETE "http://localhost:8080/tracks/1/favorite?username=alice"
# Error: Track is not in favorites

# Try to get next competition without user
curl http://localhost:8080/competitions/next
# Error: Required parameter 'username' is missing

# Try to like/dislike without username
curl -X POST http://localhost:8080/posts/1/like
# Error: Required parameter 'username' is missing
```

---

## 📊 Quick Recap of Sample Data

| Entity | Pre-loaded Count | After Testing |
|--------|-----------------|---------------|
| Users | 3 (johndoe, janesmith, bobwilson) | 6+ |
| Tracks | 4 | 6+ |
| Competitions | 3 | 4+ |
| Questions | 4 | 6+ |
| Posts | 4 | 7+ |
| Post Reactions | 0 | Multiple |
| Favorite Tracks | 0 | Multiple |
| Announcements | 0 | 2+ |

---

## 📋 Complete API Summary

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register user (name, username, bio) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/{username}` | Get full profile with stats |
| GET | `/users/{username}/followers` | Get followers |
| GET | `/users/{username}/following` | Get following |
| POST | `/users/{username}/follow?follower={username}` | Follow user |
| DELETE | `/users/{username}/follow?follower={username}` | Unfollow user |

### Tracks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tracks` | Create track (with backgroundColor) |
| GET | `/tracks` | Get all tracks |
| GET | `/tracks?attempted_by={username}` | Get user's attempted tracks |
| GET | `/tracks/{id}` | Get track by ID |
| GET | `/tracks/{id}/next-competition` | Get next competition for track |
| GET | `/tracks/{id}/enrolled-users` | **NEW** Get enrolled users |
| POST | `/tracks/{id}/favorite?username={username}` | **NEW** Add to favorites |
| DELETE | `/tracks/{id}/favorite?username={username}` | **NEW** Remove from favorites |
| GET | `/tracks/favorites?username={username}` | **NEW** Get favorites |
| GET | `/tracks/{id}/is-favorite?username={username}` | **NEW** Check if favorited |

### Competitions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/competitions` | Create competition with questions |
| GET | `/competitions/{id}` | Get competition details |
| GET | `/competitions?username={username}&status=attempted` | Get completed competitions |
| GET | `/competitions/upcoming?username={username}` | Get upcoming in user's tracks |
| GET | `/competitions/next?username={username}` | **NEW** Get next competition |
| GET | `/competitions/available?username={username}` | **NEW** Get available to enroll |
| GET | `/competitions/{id}/enrolled-users` | **NEW** Get enrolled users |
| POST | `/competitions/{id}/enroll?username={username}` | Enroll in competition |
| GET | `/competitions/{id}/questions` | Get questions (if active) |
| POST | `/competitions/{id}/submit` | Submit answers (returns percentage) |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all posts |
| GET | `/posts?username={username}` | Get user's posts |
| GET | `/posts?track_id={id}` | Get posts by track |
| GET | `/posts/user/{username}` | Get user's posts (alt) |
| GET | `/posts/{id}` | Get post by ID |
| POST | `/posts` | Create post |
| POST | `/posts/{id}/like?username={username}` | **UPDATED** Like (toggle) |
| POST | `/posts/{id}/dislike?username={username}` | **UPDATED** Dislike (toggle) |
| GET | `/posts/{id}/reaction?username={username}` | **NEW** Get user's reaction |

### Announcements (NEW)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/announcements` | Create (auto-expires in 1 week) |
| GET | `/announcements` | Get active announcements |
| GET | `/announcements/all` | Get all (including expired) |
| GET | `/announcements/{id}` | Get by ID |
| PUT | `/announcements/{id}` | Update announcement |
| DELETE | `/announcements/{id}` | Delete announcement |
| POST | `/announcements/{id}/deactivate` | Deactivate manually |

---

## 🔄 Feature Summary

### New Features Added:
1. **Track Background Color**: Tracks now have customizable `backgroundColor` (hex code)
2. **Enrolled Users**: View users enrolled in competitions/tracks
3. **Next Competition by User**: Get the next upcoming competition for a specific user
4. **Available Competitions**: Get competitions a user hasn't enrolled in yet
5. **Answer Percentage**: Submit endpoint now returns percentage score
6. **Favorite Tracks**: Add/remove tracks from favorites, check if favorited
7. **Enhanced Profile**: Detailed stats including completed competitions with scores
8. **User-Tracked Reactions**: Like/dislike with toggle functionality, tracks who reacted
9. **Announcements**: Create, update, delete announcements with auto-expiration

### Scheduled Tasks:
- **Announcement Cleanup**: Runs every hour to deactivate expired announcements
