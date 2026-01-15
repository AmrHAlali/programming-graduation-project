# Competition Platform - Spring Boot Project

A comprehensive social competition platform with tracks, MCQ competitions, posts, announcements, and favorite tracks built with Spring Boot and Spring Data JPA.

## 📋 Project Overview

This is a complete Spring Boot REST API application that provides:
- **User Management**: Registration, profiles, social follow/unfollow, detailed profile stats
- **Track System**: Learning paths/categories with background colors and favorites
- **Competition Engine**: Timed MCQ quizzes with automatic scoring and percentage calculation
- **Content Feed**: User posts with track tagging, user-tracked likes/dislikes
- **Announcements**: Platform announcements with auto-expiration (1 week default)

## 🏗️ Architecture

```
src/main/java/com/competition/
├── CompetitionPlatformApplication.java  # Main application entry point (@EnableScheduling)
├── config/
│   └── DataInitializer.java             # Sample data for testing
├── controller/
│   ├── AuthController.java              # Authentication endpoints
│   ├── UserController.java              # User profile & social endpoints
│   ├── TrackController.java             # Track/category & favorites endpoints
│   ├── CompetitionController.java       # Competition & MCQ endpoints
│   ├── PostController.java              # Post/feed endpoints
│   └── AnnouncementController.java      # Announcement endpoints
├── dto/
│   ├── UserDTO.java                     # User data with detailed profile info
│   ├── RegisterRequest.java             # Registration request
│   ├── TrackDTO.java                    # Track with background color
│   ├── CompetitionDTO.java              # Competition data transfer object
│   ├── QuestionDTO.java                 # Question with options DTO
│   ├── AnswerSubmissionDTO.java         # Answer submission with percentage result
│   ├── PostDTO.java                     # Post with user reaction info
│   └── AnnouncementDTO.java             # Announcement data transfer object
├── entity/
│   ├── User.java                        # User entity
│   ├── Track.java                       # Track with backgroundColor field
│   ├── Competition.java                 # Competition entity
│   ├── CompetitionEnrollment.java       # User enrollment in competition
│   ├── CompetitionEnrollmentId.java     # Composite key for enrollment
│   ├── Question.java                    # MCQ question entity
│   ├── Option.java                      # Answer option entity
│   ├── UserAnswer.java                  # User's submitted answer
│   ├── Post.java                        # Social post entity
│   ├── PostReaction.java                # User like/dislike on posts
│   ├── PostReactionId.java              # Composite key for reactions
│   ├── FavoriteTrack.java               # User's favorite track
│   ├── FavoriteTrackId.java             # Composite key for favorites
│   └── Announcement.java                # Announcement with auto-expiration
├── exception/
│   └── GlobalExceptionHandler.java      # Centralized error handling
├── repository/
│   ├── UserRepository.java
│   ├── TrackRepository.java
│   ├── CompetitionRepository.java
│   ├── CompetitionEnrollmentRepository.java
│   ├── QuestionRepository.java
│   ├── OptionRepository.java
│   ├── UserAnswerRepository.java
│   ├── PostRepository.java
│   ├── PostReactionRepository.java
│   ├── FavoriteTrackRepository.java
│   └── AnnouncementRepository.java
└── service/
    ├── UserService.java                 # User business logic with detailed profiles
    ├── TrackService.java                # Track & favorites business logic
    ├── CompetitionService.java          # Competition business logic
    ├── PostService.java                 # Post with user-tracked reactions
    └── AnnouncementService.java         # Announcement with scheduled cleanup
```

## 🔗 API Endpoints

### 1. Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Create a new user |

### 2. User & Social Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/{username}` | Get user profile with detailed stats (completed competitions, attempted tracks, favorites) |
| GET | `/users/{username}/followers` | Get list of followers |
| GET | `/users/{username}/following` | Get list of users being followed |
| POST | `/users/{username}/follow?follower={username}` | Follow a user |
| DELETE | `/users/{username}/follow?follower={username}` | Unfollow a user |

### 3. Track & Discovery Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tracks` | Create a new track (with backgroundColor) |
| GET | `/tracks` | Get all tracks |
| GET | `/tracks?attempted_by={username}` | Get tracks user has participated in |
| GET | `/tracks/{id}` | Get track by ID |
| GET | `/tracks/{id}/next-competition` | Get next upcoming competition for track |
| GET | `/tracks/{id}/enrolled-users` | **NEW** Get all users enrolled in track competitions |
| POST | `/tracks/{id}/favorite?username={username}` | **NEW** Add track to favorites |
| DELETE | `/tracks/{id}/favorite?username={username}` | **NEW** Remove track from favorites |
| GET | `/tracks/favorites?username={username}` | **NEW** Get user's favorite tracks |
| GET | `/tracks/{id}/is-favorite?username={username}` | **NEW** Check if track is favorited |

### 4. Competition & MCQ Engine

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/competitions` | Create competition with questions & options |
| GET | `/competitions?username={username}&status=attempted` | Get user's completed competitions |
| GET | `/competitions/upcoming?username={username}` | Get upcoming competitions in user's tracks |
| GET | `/competitions/next?username={username}` | **NEW** Get next upcoming competition for user |
| GET | `/competitions/available?username={username}` | **NEW** Get competitions user hasn't enrolled in |
| GET | `/competitions/{id}` | Get competition details |
| GET | `/competitions/{id}/enrolled-users` | **NEW** Get all enrolled users |
| POST | `/competitions/{id}/enroll?username={username}` | Enroll user in competition |
| GET | `/competitions/{id}/questions` | Get MCQs (only during active time window) |
| POST | `/competitions/{id}/submit` | Submit answers and get score with **percentage** |

### 5. Content & Feed Service

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | Get all posts |
| GET | `/posts?track_id={id}` | Get posts by track |
| GET | `/posts?username={username}` | Get posts by user |
| GET | `/posts/{id}` | Get post by ID |
| POST | `/posts` | Create a new post |
| POST | `/posts/{id}/like?username={username}` | **UPDATED** Like a post (user-tracked, toggle) |
| POST | `/posts/{id}/dislike?username={username}` | **UPDATED** Dislike a post (user-tracked, toggle) |
| GET | `/posts/{id}/reaction?username={username}` | **NEW** Get user's reaction to a post |

### 6. Announcements (NEW)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/announcements` | Create announcement (auto-expires after 1 week) |
| GET | `/announcements` | Get active (non-expired) announcements |
| GET | `/announcements/all` | Get all announcements including expired |
| GET | `/announcements/{id}` | Get announcement by ID |
| PUT | `/announcements/{id}` | Update announcement |
| DELETE | `/announcements/{id}` | Delete announcement |
| POST | `/announcements/{id}/deactivate` | Deactivate announcement manually |

## 🗄️ Database Schema

The application uses H2 in-memory database with the following entities:

### Core Tables
- **USERS**: username (PK), name, bio
- **USER_FOLLOWS**: follower_id, following_id (self-referential many-to-many)
- **TRACKS**: id, name, background_color, description
- **COMPETITIONS**: id, track_id, name, description, start_time, end_time
- **COMPETITION_ENROLLMENTS**: user_username, competition_id, total_score, finished_at
- **QUESTIONS**: id, competition_id, question_text, points_weight
- **OPTIONS**: id, question_id, option_text, is_correct
- **USER_ANSWERS**: id, user_username, question_id, selected_option_id
- **POSTS**: id, user_username, competition_id (nullable), content, likes_count, dislikes_count

### New Tables
- **POST_TRACKS**: post_id, track_id (many-to-many)
- **POST_REACTIONS**: username, post_id, reaction_type (LIKE/DISLIKE), created_at
- **FAVORITE_TRACKS**: username, track_id, added_at
- **ANNOUNCEMENTS**: id, title, description, created_at, expires_at, is_active

## 🚀 Running the Application

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Steps

1. **Navigate to project directory:**
   ```bash
   cd "/Users/mkzabout/Downloads/final project"
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application:**
   - API: http://localhost:8080
   - H2 Console: http://localhost:8080/h2-console
     - JDBC URL: `jdbc:h2:mem:competitiondb`
     - Username: `sa`
     - Password: (leave empty)

## 📝 Sample API Requests

### Register a New User
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","username":"testuser","bio":"Hello World"}'
```

### Get User Profile (with detailed stats)
```bash
curl http://localhost:8080/users/johndoe
```

**Response includes:**
- Basic info, follower/following counts
- Total score, competitions completed
- List of completed competitions with scores and percentages
- List of attempted tracks with competition counts
- List of favorite tracks

### Create a Track (with background color)
```bash
curl -X POST http://localhost:8080/tracks \
  -H "Content-Type: application/json" \
  -d '{"name":"Programming","description":"Learn to code","backgroundColor":"#3498db"}'
```

### Add Track to Favorites
```bash
curl -X POST "http://localhost:8080/tracks/1/favorite?username=johndoe"
```

### Get User's Favorite Tracks
```bash
curl "http://localhost:8080/tracks/favorites?username=johndoe"
```

### Create an Announcement
```bash
curl -X POST http://localhost:8080/announcements \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Competition Coming!",
    "description": "Get ready for our biggest programming challenge yet!"
  }'
```

### Like a Post (User-Tracked)
```bash
curl -X POST "http://localhost:8080/posts/1/like?username=johndoe"
```

### Submit Answers (Returns Percentage)
```bash
curl -X POST http://localhost:8080/competitions/1/submit \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "answers": [
      {"questionId": 1, "selectedOptionId": 1},
      {"questionId": 2, "selectedOptionId": 6}
    ]
  }'
```

**Response:**
```json
{
  "totalScore": 20,
  "correctAnswers": 2,
  "totalQuestions": 3,
  "percentage": 66.67,
  "completedAt": "2025-12-28T14:30:00"
}
```

### Get Enrolled Users for a Competition
```bash
curl http://localhost:8080/competitions/1/enrolled-users
```

### Get Enrolled Users for a Track
```bash
curl http://localhost:8080/tracks/3/enrolled-users
```

## 🧪 Sample Data

The application automatically creates sample data on startup:

- **3 Users**: johndoe, janesmith, bobwilson
- **4 Tracks**: Programming, Mathematics, Science, History (with background colors)
- **3 Competitions**: Java Basics Quiz (active), Algebra Challenge, Python Fundamentals
- **4 Questions** with options
- **4 Sample Posts**

## 🛠️ Technologies Used

- **Spring Boot 3.2.0** - Application framework
- **Spring Data JPA** - Database access
- **Spring Scheduling** - Scheduled tasks for announcement cleanup
- **Hibernate** - ORM
- **H2 Database** - In-memory database
- **Jakarta Validation** - Request validation
- **Maven** - Build tool

## 📚 Key Features

1. **Follow System**: Users can follow/unfollow each other
2. **Track-based Organization**: Content organized by learning tracks with customizable colors
3. **Favorite Tracks**: Users can favorite tracks for quick access
4. **Timed Competitions**: Questions only available during competition window
5. **Automatic Scoring**: Server calculates scores with percentage
6. **User-Tracked Reactions**: Like/dislike posts with toggle functionality
7. **Announcements**: Platform announcements with auto-expiration
8. **Detailed Profiles**: Comprehensive user statistics and history
9. **Enrolled Users**: View who's enrolled in competitions/tracks
10. **Global Error Handling**: Consistent error responses

## 👤 Author

Competition Platform Team

## 📄 License

This project is for educational purposes.
