package de.eliyo.beans;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;

import de.eliyo.controller.DatabaseController;

@ManagedBean
@RequestScoped
public class SearchBean {

	private String email;
	private String search;
	private String weburl;
	
	private String alertBadge;
	private String alertMessage;
	
	@ManagedProperty(value = "#{databaseController}")
	private DatabaseController databaseController;

	public String submit() {
		if (databaseController.insert(email, search, weburl))
			showSuccessMessage();
		else 
			showFailureMessage();
		
		return "";
	}
	
	private void showSuccessMessage() {
		alertBadge   = "alert-success";
		alertMessage = "Success! added: " + search + " on website: " + weburl + " for user: " + email;
		
		search = "";
		weburl = "";
	}

	private void showFailureMessage() {
		alertBadge   = "alert-danger";
		alertMessage = "Error! Sorry something went wrong, please try again";
	}
	
	public String getAlertBadge() {
		return alertBadge == null ? "collapse" : alertBadge;
	}
	
	public String getAlertMessage() {
		return alertMessage;
	}
	
	public void setDatabaseController(DatabaseController databaseController) {
		this.databaseController = databaseController;
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