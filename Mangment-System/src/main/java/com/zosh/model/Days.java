package com.zosh.model;

import com.zosh.domain.DAYS;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Days {
    private DAYS day;
    private int hours;
}
