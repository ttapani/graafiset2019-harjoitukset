package com.th.example.vko6_heratyskello1;

import android.media.AudioManager;
import android.media.ToneGenerator;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnTouchListener;
import android.view.MotionEvent;
import android.widget.Button;
import android.widget.TextView;

import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity {

    public enum State {
        RUNNING, SETTIME, SETALARM
    }

    private State state;
    private Boolean alarmSet = false;
    private int alarmTime;
    private Boolean snoozeSet = false;
    private int snoozeTime;

    ToneGenerator toneGenerator = new ToneGenerator(AudioManager.STREAM_ALARM, 100);

    TimerTask mTimerTask;
    final Handler handler = new Handler();
    Timer ajastin;
    int nCounter;

    TimerTask addTimeTimer;
    TimerTask removeTimeTimer;

    private TextView hoursView;
    private TextView minutesView;
    private TextView secondsView;

    private Button addMinuteButton;
    private Button addSecondButton;
    private Button removeMinuteButton;
    private Button removeSecondButton;

    // Time to tick for the adjustments in millis
    private int adjustTimeSpeed = 200;
    private int adjustTimeTicks = 0;
    private final int SPEED_SLOW = 200;
    private final int SPEED_FAST = 50;

    private Button adjustTimeButton;
    private Button adjustAlarmButton;
    private Button stopAlarmButton;
    private Button setSnoozeButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        ajastin = new Timer();
        alustaTimerTask();
        ajastin.schedule(mTimerTask, 100, 1000);

        state = State.RUNNING;

        hoursView = (TextView)findViewById(R.id.hoursView);
        minutesView = (TextView)findViewById(R.id.minutesView);
        secondsView = (TextView)findViewById(R.id.secondsView);

        addMinuteButton = (Button)findViewById(R.id.addMinute);
        addMinuteButton.setOnTouchListener(addMinuteTouch);
        addSecondButton = (Button)findViewById(R.id.addSecond);
        addSecondButton.setOnTouchListener(addSecondTouch);
        removeMinuteButton = (Button)findViewById(R.id.removeMinute);
        removeMinuteButton.setOnTouchListener(removeMinuteTouch);
        removeSecondButton = (Button)findViewById(R.id.removeSecond);
        removeSecondButton.setOnTouchListener(removeSecondTouch);

        adjustTimeButton = (Button)findViewById(R.id.adjustTime);
        adjustTimeButton.setOnClickListener(adjustTimeClicked);

        adjustAlarmButton = (Button)findViewById(R.id.adjustAlarm);
        adjustAlarmButton.setOnClickListener(adjustAlarmClicked);

        stopAlarmButton = (Button)findViewById(R.id.stopAlarm);
        stopAlarmButton.setEnabled(true);
        stopAlarmButton.setOnClickListener(stopAlarmClicked);
        setSnoozeButton = (Button)findViewById(R.id.setSnooze);
        setSnoozeButton.setEnabled(false);

        disableAdjustments();

        hoursView.setText("-");
        minutesView.setText("-");
        secondsView.setText("-");
    }

    View.OnTouchListener addMinuteTouch = new View.OnTouchListener() {
        @Override
        public boolean onTouch(View v, MotionEvent event) {
            if(event.getAction() == MotionEvent.ACTION_DOWN) {
                System.out.println("DOWN");
                createAddTimeTimer(60);
                ajastin.schedule(addTimeTimer, 0, adjustTimeSpeed);
            }
            if(event.getAction() == MotionEvent.ACTION_UP) {
                addTimeTimer.cancel();
                adjustTimeTicks = 0;
                adjustTimeSpeed = SPEED_SLOW;
                System.out.println("LIFT UP");
            }
            return false;
        }
    };

    View.OnTouchListener addSecondTouch = new View.OnTouchListener() {
        @Override
        public boolean onTouch(View v, MotionEvent event) {
            if(event.getAction() == MotionEvent.ACTION_DOWN) {
                System.out.println("DOWN");
                createAddTimeTimer(1);
                ajastin.schedule(addTimeTimer
                        , 0, 200);
            }
            if(event.getAction() == MotionEvent.ACTION_UP) {
                addTimeTimer.cancel();
                adjustTimeTicks = 0;
                adjustTimeSpeed = SPEED_SLOW;
                System.out.println("LIFT UP");
            }
            return false;
        }
    };

    View.OnTouchListener removeMinuteTouch = new View.OnTouchListener() {
        @Override
        public boolean onTouch(View v, MotionEvent event) {
            if(event.getAction() == MotionEvent.ACTION_DOWN) {
                System.out.println("DOWN");
                createRemoveTimeTimer(60);
                ajastin.schedule(removeTimeTimer
                        , 0, 200);
            }
            if(event.getAction() == MotionEvent.ACTION_UP) {
                removeTimeTimer.cancel();
                adjustTimeTicks = 0;
                adjustTimeSpeed = SPEED_SLOW;
                System.out.println("LIFT UP");
            }
            return false;
        }
    };

    View.OnTouchListener removeSecondTouch = new View.OnTouchListener() {
        @Override
        public boolean onTouch(View v, MotionEvent event) {
            if(event.getAction() == MotionEvent.ACTION_DOWN) {
                System.out.println("DOWN");
                createRemoveTimeTimer(1);
                ajastin.schedule(removeTimeTimer
                        , 0, 200);
            }
            if(event.getAction() == MotionEvent.ACTION_UP) {
                removeTimeTimer.cancel();
                adjustTimeTicks = 0;
                adjustTimeSpeed = SPEED_SLOW;
                System.out.println("LIFT UP");
            }
            return false;
        }
    };


    View.OnClickListener adjustTimeClicked = new OnClickListener() {
        public void onClick(View v) {
            if(state != state.SETTIME) {
                adjustTimeButton.setBackgroundResource(R.drawable.button_activestate);
                state = State.SETTIME;
                adjustAlarmButton.setEnabled(false);
                enableAdjustments();
                updateSeconds();
                mTimerTask.cancel();
            }
            else {
                state = State.RUNNING;
                adjustTimeButton.setBackgroundResource(R.drawable.button_controlstate);
                adjustAlarmButton.setEnabled(true);
                disableAdjustments();
                updateSeconds();
                alustaTimerTask();
                ajastin.schedule(mTimerTask, 100, 1000);
            }
        }
    };

    View.OnClickListener adjustAlarmClicked = new OnClickListener() {
        public void onClick(View v) {
            if(state != state.SETALARM) {
                adjustAlarmButton.setBackgroundResource(R.drawable.button_activestate);
                state = State.SETALARM;
                adjustTimeButton.setEnabled(false);
                enableAdjustments();
                updateSeconds();
            }
            else {
                state = State.RUNNING;
                adjustAlarmButton.setBackgroundResource(R.drawable.button_controlstate);
                adjustTimeButton.setEnabled(true);
                disableAdjustments();
                updateSeconds();
                alarmSet = true;
            }
        }
    };

    View.OnClickListener stopAlarmClicked = new OnClickListener() {
        @Override
        public void onClick(View v) {
            ringAlarm();
        }
    };

    public void disableAdjustments() {
        addMinuteButton.setEnabled(false);
        addSecondButton.setEnabled(false);
        removeMinuteButton.setEnabled(false);
        removeSecondButton.setEnabled(false);
    }

    public void enableAdjustments() {
        addMinuteButton.setEnabled(true);
        addSecondButton.setEnabled(true);
        removeMinuteButton.setEnabled(true);
        removeSecondButton.setEnabled(true);
    }

    public void updateHours() {
        if(state == State.SETALARM) {
            if (nCounter / 3600 == 24) {
                hoursView.setText("00");
            } else
                hoursView.setText(String.format("%02d", alarmTime / 3600));
        } else {
            if (nCounter / 3600 == 24) {
                hoursView.setText("00");
            } else
                hoursView.setText(String.format("%02d", nCounter / 3600));
        }
    }

    public void updateMinutes() {
        updateHours();
        if(state == State.SETALARM) {
            minutesView.setText(String.format("%02d", alarmTime % 3600 / 60));
        } else {
            minutesView.setText(String.format("%02d", nCounter % 3600 / 60));
        }
    }

    public void updateSeconds() {
        updateMinutes();
        if(state == State.SETALARM) {
            secondsView.setText(String.format("%02d", alarmTime % 60));
        } else {
            secondsView.setText(String.format("%02d", nCounter % 60));
        }
    }

    public void addSeconds(int aSeconds) {
        nCounter += aSeconds;
        if(nCounter > 86400) {
            nCounter = nCounter - 86400;
        }
        updateSeconds();
    }

    public void removeSeconds(int aSeconds) {
        nCounter -= aSeconds;
        if(nCounter < 0) {
            nCounter = nCounter + 86400;
        }
        updateSeconds();
    }

    public void addAlarmSeconds(int aSeconds) {
        alarmTime += aSeconds;
        if(alarmTime > 86400) {
            alarmTime = alarmTime - 86400;
        }
        updateSeconds();
    }

    public void removeAlarmSeconds(int aSeconds) {
        alarmTime -= aSeconds;
        if(alarmTime < 0) {
            alarmTime = alarmTime + 86400;
        }
        updateSeconds();
    }

    public void alarmTriggered() {

    }

    public void ringAlarm() {
        int toneType = ToneGenerator.TONE_DTMF_S;
        int durationMs = 500;
        toneGenerator.startTone(toneType, durationMs);
    }

    public void alustaTimerTask() {
        mTimerTask = new TimerTask() {
            public void run() {
                handler.post (
                        new Runnable() {
                            public void run () {
                                addSeconds(1);
                                if(alarmSet) {
                                    if(nCounter == alarmTime) {
                                        System.out.println("Alarm triggered");
                                        // Play tone xD
                                    }
                                }
                                if(snoozeSet) {
                                    if(nCounter == snoozeTime) {
                                        System.out.println("Alarm triggered");
                                        // Play tone xD
                                    }
                                }
                                System.out.println("Tick " + nCounter);
                            }
                        }
                );
            }
        };
    }

    public void createAddTimeTimer(final int aTime) {
        addTimeTimer = new TimerTask() {
            @Override
            public void run() {
                handler.post (
                        new Runnable() {
                            public void run () {
                                if(adjustTimeTicks == 5 && adjustTimeSpeed == SPEED_SLOW) {
                                    addTimeTimer.cancel();
                                    createAddTimeTimer(aTime);
                                    adjustTimeSpeed = SPEED_FAST;
                                    ajastin.schedule(addTimeTimer, 0, adjustTimeSpeed);
                                }
                                adjustTimeTicks++;
                                if(state == State.SETTIME) {
                                    addSeconds(aTime);
                                }
                                if(state == State.SETALARM) {
                                    addAlarmSeconds(aTime);
                                }
                                System.out.println("Adding seconds: " + aTime);
                            }
                        }
                );
            }
        };
    }

    public void createRemoveTimeTimer(final int aTime) {
        removeTimeTimer = new TimerTask() {
            @Override
            public void run() {
                handler.post (
                        new Runnable() {
                            public void run () {
                                if(adjustTimeTicks == 5 && adjustTimeSpeed == SPEED_SLOW) {
                                    removeTimeTimer.cancel();
                                    createRemoveTimeTimer(aTime);
                                    adjustTimeSpeed = SPEED_FAST;
                                    ajastin.schedule(removeTimeTimer, 0, adjustTimeSpeed);
                                }
                                adjustTimeTicks++;
                                if(state == State.SETTIME) {
                                    removeSeconds(aTime);
                                }
                                if(state == State.SETALARM) {
                                    removeAlarmSeconds(aTime);
                                }
                                System.out.println("Removing seconds: " + aTime);
                            }
                        }
                );
            }
        };
    }
}
