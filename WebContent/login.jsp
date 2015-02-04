<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>

<html lang="en" class="no-js">
    <head>
    
    <meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<title>Instagram - Login</title>
		
		<link rel="stylesheet" type="text/css" href="css/normalize.css" />
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.2.0/css/font-awesome.min.css" />
		<link rel="stylesheet" type="text/css" href="css/menu_topside.css" />
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/responsive.css">
    </head>

    <body>
    	<div class="main-container">
			<!-- content -->
			<div class="content-wrap">
				<div class="main-content">
					<header class="content__header">
						<h1>Login</h1>
					</header>
					
					<section class="content__main">
						<div class="form-login">
							<form action="/insta/login" method="post"> 
								
								<label class="form-login__label" for="username">Username</label>
								<div class="input-group">
								    <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
									<input type="text" class="form-control form-login__input" id="username" name="username" title="username" />
								</div>
								<label class="form-login__label" for="password">Password</label>
								<div class="input-group">
								    <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
									<input type="password" class="form-control form-login__input" id="password" name="password" title="password"/>
								</div>
								<button type="submit" id="submit" class="btn form-login__button">Submit</button>
							</form>	
						</div>
					</section>
				</div>
		    </div>
		
		</div>
		<a href="#username">MEI</a>
        <script src="js/jquery-1.11.1.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
    </body>

</html>