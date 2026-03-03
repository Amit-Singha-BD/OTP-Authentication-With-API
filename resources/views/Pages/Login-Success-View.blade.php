@extends('Layout.Master-Layout')
@section('Content')

  <div class="wv-unique-card">
    
    <div class="wv-unique-profile-area">
      <i class="fa-solid fa-user-check"></i>
      <div class="wv-unique-badge"></div>
    </div>

    <h2 class="wv-unique-name">Welcome Back!</h2>
    <h3 class="wv-name">{{ Auth::user()->name }}</h3>
    <p class="wv-unique-status">Login Successful. You are now connected.</p>

    <div class="d-flex justify-content-center">
        <form action="{{ route('logout') }}" method="POST">
            @csrf
            <button type="submit" name="submit" class="wv-unique-btn wv-unique-btn-outline">
                <i class="fa-solid fa-power-off me-1"></i> Logout
            </button>
        </form>
    </div>

  </div>

@endsection