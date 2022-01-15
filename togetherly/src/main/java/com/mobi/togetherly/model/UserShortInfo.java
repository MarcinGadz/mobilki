package com.mobi.togetherly.model;

public class UserShortInfo {
    private Long id;
    private String username;
    private String gravatarEmail;

    public UserShortInfo(User u) {
        this.gravatarEmail = u.getGravatarEmail();
        this.id = u.getId();
        this.username = u.getUsername();
    }

    public UserShortInfo() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getGravatarEmail() {
        return gravatarEmail;
    }

    public void setGravatarEmail(String gravatarEmail) {
        this.gravatarEmail = gravatarEmail;
    }
}
