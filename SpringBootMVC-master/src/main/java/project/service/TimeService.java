package project.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeService{
    private Date date;
    private String dateString;
    public TimeService(Date date){
        this.date = date;
        SimpleDateFormat form = new SimpleDateFormat ("dd.MM.yyyy");
        this.dateString = form.format(date);
    }

    public TimeService(String date){
        SimpleDateFormat form = new SimpleDateFormat ("dd.MM.yyyy");
        try {
            this.date = form.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDateString() {
        return dateString;
    }

    public void setDateString(String dateString) {
        this.dateString = dateString;
    }
}