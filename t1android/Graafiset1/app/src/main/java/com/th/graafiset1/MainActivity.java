package com.th.graafiset1;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;
import android.view.View;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    private TextView sanom;
    private Button makeGreenButton;
    private Button makeRedButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sanom = (TextView) findViewById(R.id.teksti1);
        makeGreenButton = (Button) findViewById(R.id.makeGreenButton);
        makeRedButton = (Button) findViewById(R.id.makeRedButton);
        makeGreenButton.setBackgroundResource(R.drawable.button_makegreen);
        makeRedButton.setBackgroundResource(R.drawable.button_makered);
    }

    public void makeRed(View v) {
        sanom.setText("Punainen");
        sanom.setBackgroundColor(0xFFFF0000);
        makeRedButton.setEnabled(false);
        makeGreenButton.setEnabled(true);

    }

    public void makeGreen(View v) {
        sanom.setText("Vihreä");
        sanom.setBackgroundColor(0xFF00FF00);
        makeGreenButton.setEnabled(false);
        makeRedButton.setEnabled(true);
    }
}
