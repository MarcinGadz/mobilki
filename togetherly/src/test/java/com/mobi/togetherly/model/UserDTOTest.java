package com.mobi.togetherly.model;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class UserDTOTest {

    @Test
    public void fromDTO() {
        String email = "test1";
        String passwd = "pass";
        String uname = "user";
        String gravataremail = "othremail@com.pl";
        Long id = 23L;
        LocalDate birthdate = LocalDate.of(2000,2,20);
        UserDTO dto = new UserDTO();
        dto.setEmail(email);
        dto.setPassword(passwd);
        dto.setUsername(uname);
        dto.setGravatarEmail(gravataremail);
        dto.setBirthDate(birthdate);
        dto.setId(id);
        User fromDto = dto.fromDTO();
        assertEquals(dto.getEmail(), fromDto.getEmail());
        assertEquals(dto.getPassword(), fromDto.getPassword());
        assertEquals(dto.getUsername(), fromDto.getUsername());
        assertEquals(dto.getGravatarEmail(), fromDto.getGravatarEmail());
        assertEquals(dto.getBirthDate(), fromDto.getBirthDate());
        assertEquals(dto.getId(), fromDto.getId());
    }


    @Test
    void getId() {
    }

    @Test
    void setId() {
    }

}