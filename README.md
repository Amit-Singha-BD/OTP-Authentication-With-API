# OTP Authentication With API

## Project Overview
This project is built for learning purposes to understand OTP (One-Time Password) verification during user registration using Laravel and Laravel Sanctum. It also demonstrates secure login using username or email with password authentication. along with API token authentication for protected routes.

## Features
- User Registration with OTP Verification
- Send OTP via SMS
- Login using Username or Email with Password
- API Token Authentication using Laravel Sanctum
- Protected API Routes
- Logout (Token Revocation)

## Tech Stack
- Laravel
- Laravel Sanctum
- MySQL
- RESTful API
- Postman (API Testing)

## Requirements
- PHP 8.0+
- Composer
- MySQL
- Laravel 10+

## Folder Structure
```
app
├── Http
│   ├── Controllers
│   │   ├── AuthController
│   │   │   └── AuthenticationController.php
│   │   └── APIController
│   │       └── AuthenticationController.php
├── Services
│   └── SMSSent.php
```

## Installation Guide
Follow these 7 steps to install and set up the project:

### Step 1: Clone the Repository
```
git clone https://github.com/Amit-Singha-BD/OTP-Authentication-With-API.git
cd OTP-Authentication-With-API
```

### Step 2: Install Dependencies
```
composer install
```

### Step 3: Setup Environment File
```
cp .env.example .env
```

### Step 4: Generate Application Key
```
php artisan key:generate
```

### Step 5: Install Sanctum
```
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### Step 6: Run Migrations
```
php artisan migrate
```

### Step 7: Start the Development Server
```
php artisan serve
```

## Authentication Flow
- User registers using phone number
- System generates an OTP
- OTP is sent via SMS Gateway API
- User verifies the OTP to complete registration
- User logs in using username/email and password
- Laravel Sanctum generates an API token
- Token is used to access protected routes

## API Endpoints
```
Method    Endpoint
POST      /api/register
POST      /api/send-otp
POST      /api/verify-otp
POST      /api/login
POST      /api/logout
GET       /api/user
```

## SMS Service Setup
This project uses a custom SMS service class to send OTP messages through an external SMS Gateway API.

### Service File
```
app/Services/SMSSent.php
```

### Configure Your SMS Gateway
Open the service file and set your API credentials:
```
$apiKey = 'YOUR_SMS_API_KEY';
$url = 'YOUR_SMS_GATEWAY_URL';
```

## Learning Objectives
- Understand OTP implementation for registration verification
- Learn Laravel Service Class usage
- Implement external SMS Gateway API
- Understand Laravel Sanctum token authentication
- Protect routes using middleware
- Practice building secure REST APIs

## Author
- Amit Singha
- Backend Developer
- Passionate about learning and practicing Laravel advanced concepts
