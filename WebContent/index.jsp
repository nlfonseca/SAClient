<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>

<html lang="en" class="no-js">
    <head>
    
    <meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<title>FIFA Ballon D'Or</title>
		
		<link rel="stylesheet" type="text/css" href="css/normalize.css" />
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.2.0/css/font-awesome.min.css" />
		<link rel="stylesheet" type="text/css" href="css/menu_topside.css" />
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/responsive.css">
    </head>
	
    <body>
        <%
			int usr_id = -1;
        	String usr_email = "";
        	long usr_cc = -1;
        	String usr_username = "";
        	int usr_is_admin = -1;
        	String usr_photo = "";
        	
        	if (session.getAttribute("usr_id") == null) {
	        	String redirectURL = "login.jsp";
	            response.sendRedirect(redirectURL);
	        } else {
	        	usr_id = (Integer) session.getAttribute("usr_id");
	        	usr_email = (String) session.getAttribute("usr_email");
	        	usr_cc = (Long) session.getAttribute("usr_cc");
	        	usr_username = (String) session.getAttribute("usr_username");
	        	usr_is_admin = (Integer) session.getAttribute("usr_is_admin");
	        	usr_photo = (String) session.getAttribute("usr_photo");
	        }
        	
        	String photoUser = "";
        	
        	if (usr_photo == "") {
        		photoUser = "img/avatar.png";
        	} else {
        		photoUser = "data:image/png;base64," +  usr_photo;
        	}
        
        	String pageName = "Profile";
		%>
    	<div class="main-container">
    		<!-- nav -->
			<div class="menu-wrap">
				<nav class="menu-top">
					<div class="profile">
						<img src="<%= photoUser %>" alt="<%= usr_username %>" style="width:42px;"/>
						<span class="profile-username" data-userid="<%= usr_id %>"><%= usr_username %></span>
					</div>
				</nav>
				<nav class="menu-side">
					<!-- <a href="#">
						<i class="fa fa-search"></i>
						<input class="search-tag" id="search-tag" name="search-tag" title="search tag" type="text" placeholder="Search">
					</a> -->
					<a href="index.jsp"><i class="fa fa-user"></i> Profile</a>
					<form action="/saclient/logout" method="post">
						<input class="input-logout" type="submit" value="Logout" />
					</form>
				</nav>
			</div>
			
			<button class="menu-button" id="open-button">Open Menu</button>
			
			<!-- content -->
			<div class="content-wrap">
				<div class="main-content">
					<header class="content__header">
						<h1 id="page-name"><%= pageName %></h1>
						<div class="content__subtitle"></div>
					</header>
					
					<section class="content__main">
						 
						 <!-- result -->
			            <div id="container-photos" class="row text-left">
			            	<label><input type="radio" name="vote-player" id="1"> Name 1</label>
			            	<label><input type="radio" name="vote-player" id="2"> Name 2</label>
			            	<label><input type="radio" name="vote-player" id="3"> Name 3</label>
			            	<label><input type="radio" name="vote-player" id="4"> Name 4</label>
			            	<label><input type="radio" name="vote-player" id="5"> Name 5</label>
			            	<label><input type="radio" name="vote-player" id="6"> Name 6</label>
			            	<label><input type="radio" name="vote-player" id="7"> Name 7</label>
			            	<label><input type="radio" name="vote-player" id="8"> Name 8</label>
			            	<label><input type="radio" name="vote-player" id="9"> Name 9</label>
			            	<label><input type="radio" name="vote-player" id="10"> Name 10</label>
			            </div>

					</section>
				</div>
		    </div>
		</div>
		
        <script src="js/jquery-1.11.1.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
		<script src="js/classie.js"></script>
		<script src="js/main.js"></script>
		<script src="js/user.js"></script>
        
    </body>

</html>