@extends('Layout.Master-Layout')
@section('Content')

  <div class="lf-unique-card">
    <h3 class="lf-unique-title">Welcome Back</h3>
    <p class="lf-unique-subtitle">Enter your credentials to access your account</p>

    <form action="{{ route('login.submit') }}" method="POST">
      @csrf
      
      <div class="lf-unique-input-group">
        <div class="form-floating">
          <input type="text" name="both" class="form-control lf-unique-control @error('both') is-invalid @enderror" id="lf_user" placeholder="Username" value="{{ old('both') }}">
          <label for="lf_user" class="lf-unique-floating-label">Username or Email</label>
          <i class="fa-solid fa-user-shield lf-unique-icon"></i>
        </div>
        @error('both')
          <span class="custom-error-text">{{ $message }}</span>
        @enderror
      </div>

      <div class="lf-unique-input-group">
        <div class="form-floating">
          <input type="password" name="password" class="form-control lf-unique-control @error('password') is-invalid @enderror" id="lf_pass" placeholder="Password">
          <label for="lf_pass" class="lf-unique-floating-label">Password</label>
          <i class="fa-solid fa-key lf-unique-icon"></i>
        </div>
        @error('password')
          <span class="custom-error-text">{{ $message }}</span>
        @enderror
      </div>

      <button type="submit" name="submit" class="lf-unique-submit-btn">
        Login Now <i class="fa-solid fa-arrow-right-to-bracket"></i>
      </button>

      <div class="lf-unique-footer">
        New here? <a href="{{ route('register.view') }}">Create an Account</a>
      </div>

    </form>
  </div>

@endsection