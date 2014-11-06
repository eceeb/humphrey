package de.eliyo.beans;

import java.io.Serializable;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.RequestScoped;
import eliyo.de.main.DatabaseController;

@ManagedBean
@RequestScoped
public class SearchBean implements Serializable {

	private static final long serialVersionUID = 1L;

	private String email = "";
	private String search = "";
	private String weburl = "";
	
	private boolean writtenToDataBase = false;
	private boolean dataBaseWriteFailer = false;

	public String showReturn() {
		writtenToDataBase = false;
		dataBaseWriteFailer = false;
		
		if (!email.isEmpty() && !search.isEmpty() && !weburl.isEmpty()) {
			DatabaseController contr = new DatabaseController();

			if (writtenToDataBase = contr.insert(email, search, weburl)) {
				search = "";
				weburl = "";
				return "";
			}
			else {
				dataBaseWriteFailer = true;
				System.out.println("soory something went wrong please try again");
			}
		}
		return "";
	}
	
	public String getAlert() {
		String alert = "";
		if (writtenToDataBase == true && dataBaseWriteFailer == false)
			alert = "alert-success";
		if (dataBaseWriteFailer == true)
			alert = "alert-danger";
		return alert;
	}
	
	public String getAlertVisibility() {
		if(writtenToDataBase == false && dataBaseWriteFailer == false)
			return "visibility:hidden";
		return "";
	}
	
	public String getAlertMessage() {
		String message = "";
		if(writtenToDataBase == true && dataBaseWriteFailer == false)
			message = "<strong>Success!</strong> added: " + search + " on website :" + weburl + " for user: " + email;
		if (dataBaseWriteFailer)
			message =  "<strong>Error!</strong> Sorry something went wrong, please try again";
		return message;
	}
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSearch() {
		return search;
	}

	public void setSearch(String search) {
		this.search = search;
	}

	public String getWeburl() {
		return weburl;
	}

	public void setWeburl(String weburl) {
		this.weburl = weburl;
	}

}