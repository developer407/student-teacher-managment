package com.zosh.model;


import jakarta.persistence.Entity;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Data

public class Availability {

    private Set<Days> days;

}
