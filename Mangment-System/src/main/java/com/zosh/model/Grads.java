package com.zosh.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Grads {

    private String grad;
    private int fees;
    private double feesPerMinute;

}
