public class Time{
    int start;
    int end;
    String startTime;
    String endTime;
    public Time(int start, int end){
        SimpleDateFormat form = new SimpleDateFormat ("dd.MM.yyyy 'kl' hh:mm:ss");
        this.startTime = form.format(start);
        this.endTime = form.format(end);
        this.start = start;
        this.end = end;
    }
}