<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>

<html lang="en" class="no-js">
    <head>
    
    <meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<title>FIFA Ballon D'Or - Admin</title>
		
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
	    
	    	String pageName = "Administrator";
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
					<a href="#">
						<i class="fa fa-search"></i>
						<input class="search-tag" id="search-tag" name="search-tag" title="search tag" type="text" placeholder="Search">
					</a>
					<a href="index.jsp"><i class="fa fa-user"></i> Profile</a>
					<form action="/insta/logout" method="post">
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
			            <div id="container-photos" class="row text-center">
			            	<div id="chartdiv" style="width: 640px; height: 400px;background: #fff;margin: 0 auto;"></div>
			            </div>

					</section>
				</div>
		    </div>
		</div>
		
        <script src="js/jquery-1.11.1.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
		<script src="js/classie.js"></script>
		<script src="js/main.js"></script>
		<script src="js/amcharts/amcharts.js"></script>
		<script src="js/amcharts/serial.js"></script>
		<script src="js/admin.js"></script>
        
    </body>

</html>