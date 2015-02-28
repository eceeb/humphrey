package de.eliyo.controller;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;

import de.eliyo.beans.Wanted;
import de.eliyo.service.SearchService;

@ManagedBean
@RequestScoped
public class SearchController {

	@ManagedProperty(value = "#{wanted}")
	private Wanted wanted;
	
	@ManagedProperty(value = "#{searchService}")
	private SearchService service;
	
	private String alertBadge;
	private String alertMessage;
	
	public String submit() {
		if (service.insert(wanted))
			showSuccessMessage();
		else 
			showFailureMessage();
		
		return "";
	}

	private void showSuccessMessage() {
		alertBadge = "alert-success";
		alertMessage = "Success! added: " + wanted.getSearch() + " on website: " + wanted.getWeburl() + " for user: " + wanted.getEmail();
		
		// introduce clear method
		wanted.setSearch("");
		wanted.setWeburl("");
	}

	private void showFailureMessage() {
		alertBadge = "alert-danger";
		alertMessage = "Error! Sorry something went wrong, please try again";
	}
	
	public String getAlertBadge() {
		return alertBadge == null ? "collapse" : alertBadge;
	}
	
	public String getAlertMessage() {
		return alertMessage;
	}
	
	
	public Wanted getWanted() {
		return wanted;
	}

	public void setWanted(Wanted w) {
		this.wanted = w;
	}

	public SearchService getService() {
		return service;
	}

	public void setService(SearchService service) {
		this.service = service;
	}
	
}
