<%@page import="eliyo.de.main.*;"%>
<%@ page contentType="text/html; charset=iso-8859-1" language="java"%>
<%
	String email  = request.getParameter("email") == null ? "" : request.getParameter("email");
	String search = request.getParameter("search") == null ? ""	: request.getParameter("search");
	String weburl = request.getParameter("weburl") == null ? ""	: request.getParameter("weburl");
%>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Search That Website</title>

<!-- Bootstrap -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script	src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</head>
<body>
	<form name="frm" method="post" action="index.jsp">

		<!-- Static navbar -->
		<div class="navbar navbar-default navbar-static-top" role="navigation">
			<div class="container">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed"
						data-toggle="collapse" data-target=".navbar-collapse">
						<span class="sr-only">Toggle navigation</span> <span
							class="icon-bar"></span> <span class="icon-bar"></span> <span
							class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">elc industries</a>
				</div>
				<div class="navbar-collapse collapse">
					<ul class="nav navbar-nav">
						<li class="active"><a href="#">Home</a></li>
						<li><a href="#about">About</a></li>
						<li class="dropdown"><a href="#" class="dropdown-toggle"
							data-toggle="dropdown">Dropdown <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="#">Action</a></li>
								<li><a href="#">Another action</a></li>
								<li><a href="#">Something else here</a></li>
								<li class="divider"></li>
								<li class="dropdown-header">Nav header</li>
								<li><a href="#">Separated link</a></li>
								<li><a href="#">One more separated link</a></li>
							</ul></li>
					</ul>
					<ul class="nav navbar-nav navbar-right">
<!-- 						<li class="active"><a href="./">Static top</a></li> -->
<!-- 						<li><a href="../navbar-fixed-top/">Fixed top</a></li> -->
					</ul>
				</div>
				<!--/.nav-collapse -->
			</div>
		</div>


		<div class="container">

			<!-- Main component for a primary marketing message or call to action -->
			<div class="jumbotron">
				<h1>Search That Website</h1>
				<p>Tiered of reloading a website to check if the content you are
					looking for is available.</p>
				<p>Then just enter your email, what you are looking for and the
					URL of the website.</p>
				<p>You will get notified if the content is available.</p>
			</div>

			<form role="form">
				<div class="form-group">
					<input type="text" class="form-control" name="email"
						value="<%=email%>" placeholder="E-Mail" autofocus="autofocus">
				</div>
				<div class="form-group">
					<input type="text" class="form-control" name="search"
						placeholder="Search string">
				</div>
				<div class="form-group">
					<input type="text" class="form-control" name="weburl"
						placeholder="URL to website">
				</div>
				<button type="submit" class="btn btn-default btn-lg">
					<span class="glyphicon glyphicon-star"></span> Go!
				</button>
		<%
			if (!email.isEmpty() && !search.isEmpty() && !weburl.isEmpty()) {
				DatabaseController contr = new DatabaseController();

				if (contr.insert(email, search, weburl)){ %>
				<div class="alert alert-success alert-dismissible" role="alert" style="float:right">
					<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					Inserted the search for <%=search%> on the website <%=weburl%> from <%=email%>
				</div>
			<% }
				else
					out.print("soory something went wrong please try again");
			}
		
			search = "";
			weburl = "";
			request = null;
		%>
			</form>


		</div>
		<!-- /container -->
</body>
</html>