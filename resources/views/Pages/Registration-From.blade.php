@extends('Layout.Master-Layout')
@section('Content')

<div class="rf-unique-card">
    <h3 class="rf-unique-title">Create Account</h3>
    <form action="{{ route('register.submit') }}" method="POST">
        @csrf
        <div class="rf-unique-input-group">
            <div class="form-floating">
                <input type="text" name="name" class="form-control rf-unique-control @error('name') is-invalid @enderror" id="rf_name" placeholder="Full Name" value="{{ old('name') }}">
                <label for="rf_name" class="rf-unique-floating-label">Full Name</label>
                <i class="fa-solid fa-circle-user rf-unique-icon"></i>

                @error('name')
                    <div class="custom-error-text">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="row g-2">
            <div class="col-md-6 rf-unique-input-group">
                <div class="form-floating">
                    <input type="email" name="email" class="form-control rf-unique-control @error('email') is-invalid @enderror" id="rf_email" placeholder="Email" value="{{ old('email') }}">
                    <label for="rf_email" class="rf-unique-floating-label">Email</label>
                    <i class="fa-solid fa-envelope rf-unique-icon"></i>

                    @error('email')
                        <div class="custom-error-text">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="col-md-6 rf-unique-input-group">
                <div class="form-floating">
                    <input type="tel" name="phone_number" class="form-control rf-unique-control @error('phone_number') is-invalid @enderror" id="rf_phone" placeholder="Phone" value="{{ old('phone_number') }}">
                    <label for="rf_phone" class="rf-unique-floating-label">Phone</label>
                    <i class="fa-solid fa-phone rf-unique-icon"></i>

                    @error('phone_number')
                        <div class="custom-error-text">{{ $message }}</div>
                    @enderror
                </div>
            </div>
        </div>

        <div class="row g-2">
            <div class="col-md-6 rf-unique-input-group">
                <div class="form-floating">
                    <select name="gender" class="form-select rf-unique-control @error('gender') is-invalid @enderror" id="rf_gender">
                        <option value="" disabled selected></option>
                        <option value="male" {{ old('gender')=='male'?'selected':'' }}>Male</option>
                        <option value="female" {{ old('gender')=='female'?'selected':'' }}>Female</option>
                        <option value="other" {{ old('gender')=='other'?'selected':'' }}>Other</option>
                    </select>
                    <label for="rf_gender" class="rf-unique-floating-label">Gender</label>
                    <i class="fa-solid fa-venus-mars rf-unique-icon"></i>

                    @error('gender')
                        <div class="custom-error-text">{{ $message }}</div>
                    @enderror
                </div>
            </div>


            <div class="col-md-6 rf-unique-input-group">
                <div class="form-floating">
                    <input type="text" name="username" class="form-control rf-unique-control @error('username') is-invalid @enderror" id="rf_user" placeholder="Username" value="{{ old('username') }}">
                    <label for="rf_user" class="rf-unique-floating-label">Username</label>
                    <i class="fa-solid fa-at rf-unique-icon"></i>

                    @error('username')
                        <div class="custom-error-text">{{ $message }}</div>
                    @enderror
                </div>
            </div>
        </div>

        <div class="rf-unique-input-group">
            <div class="form-floating">
                <input type="password" name="password" class="form-control rf-unique-control @error('password') is-invalid @enderror" id="rf_pass" placeholder="Password">
                <label for="rf_pass" class="rf-unique-floating-label">Password</label>
                <i class="fa-solid fa-lock rf-unique-icon"></i>

                @error('password')
                    <div class="custom-error-text">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <div class="rf-unique-input-group">
            <div class="form-floating">
                <input type="password" name="password_confirmation" class="form-control rf-unique-control @error('password_confirmation') is-invalid @enderror" id="rf_confirm" placeholder="Confirm Password">
                <label for="rf_confirm" class="rf-unique-floating-label">Confirm Password</label>
                <i class="fa-solid fa-shield-check rf-unique-icon"></i>

                @error('password_confirmation')
                    <div class="custom-error-text">{{ $message }}</div>
                @enderror
            </div>
        </div>

        <button type="submit" name="submit" class="rf-unique-submit-btn w-100">
            Register Now <i class="fa-solid fa-paper-plane ms-2"></i>
        </button>
    </form>
</div>

@endsection