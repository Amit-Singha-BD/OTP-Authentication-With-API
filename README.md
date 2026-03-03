# OTP Authentication with API

## Project Description
This project is built for learning purposes to understand OTP (One-Time Password) verification during user registration using Laravel and Laravel Sanctum. It also demonstrates secure login with username/email and password, along with API token authentication for protected routes.

The main objective of this project is to practice:
- OTP verification during registration
- API authentication with Laravel Sanctum
- Protecting API routes using middleware
- Building RESTful APIs

## Features
- User Registration with OTP verification
- Send OTP via SMS for registration
- Login using username/email and password
- API Token Authentication using Laravel Sanctum
- Protected API Routes
- Logout (Token Revocation)

## Tech Stack
- Laravel
- Laravel Sanctum
- MySQL
- REST API
- cURL (for SMS API integration)
- Postman (for API testing)

## Installation Guide
- Follow these 8 steps to install and set up the project.

### Step 1
#### Clone the Repository

```
git clone https://github.com/Amit-Singha-BD/OTP-Authentication-With-API.git
cd OTP-Authentication-With-API
```

### Step 2
#### Install Dependencies

```
composer install
```

### Step 3
#### Setup Environment File

```
cp .env.example .env
```

### Step 4
#### Generate Application Key

```
php artisan key:generate
```

### Step 5
#### Run Migration

```
php artisan migrate
```

### Step 6
#### Install & Configure Sanctum (If Needed)

```
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

### Step 7
#### Start the Development Server

```
php artisan db:seed
```

### Step 8
#### Start the Development Server

```
php artisan serve
http://127.0.0.1:8000
```

## SMS Service Configuration
- This project includes a custom SMS service class.

### File Location

```
app/Services/SMSSent.php
```

### Environment Variables

```
SMS_API_KEY=your_sms_api_key
SMS_API_URL=https://your-sms-gateway-url.com/api/send
```

## Authentication Flow
- User registers with phone number
- System generates OTP
- OTP is sent via SMS API
- User verifies OTP to complete registration
- User can login using username/email and password
- After login, Sanctum generates API token for accessing protected routes

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
