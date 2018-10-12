package project.service;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeService{
    private Date startDate;
    private Date end;
    private String startString;
    private String endString;
    public TimeService(Date start, Date end){
        SimpleDateFormat form = new SimpleDateFormat ("dd.MM.yyyy 'kl' hh:mm:ss");
        this.startString = form.format(start);
        this.endString = form.format(end);
        this.startDate = start;
        this.end = end;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(int startDate) {
        this.startDate = startDate;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(int end) {
        this.end = end;
    }

    public String getStartString() {
        return startString;
    }

    public void setStartString(String startString) {
        this.startString = startString;
    }

    public String getEndString() {
        return endString;
    }

    public void setEndString(String endString) {
        this.endString = endString;
    }
}