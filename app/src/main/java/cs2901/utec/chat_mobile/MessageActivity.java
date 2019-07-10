package cs2901.utec.chat_mobile;

import android.app.Activity;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class MessageActivity extends AppCompatActivity {

    RecyclerView mRecyclerView;
    RecyclerView.Adapter mAdapter;

    public Activity getActivity(){
        return this;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_message);
        String username = getIntent().getExtras().get("username").toString();
        setTitle("@"+username);
        mRecyclerView = findViewById(R.id.main_recycler_view);
    }

    @Override
    protected void onResume(){
        super.onResume();

        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        getChats();
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                while (true) {
                    try {
                        Thread.sleep(1500);
                        getChats();
                    }
                    catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        Thread hilo = new Thread(runnable);
        hilo.start();
    }


    public void getChats(){
        final String url = "http://10.0.2.2:8080/resumen";
        RequestQueue queue = Volley.newRequestQueue(this);

        JsonObjectRequest request = new JsonObjectRequest(
                Request.Method.GET,
                url,
                null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONArray data = response.getJSONArray("response");
                            mAdapter = new MyMessageAdapter(data, getActivity());
                            mRecyclerView.setAdapter(mAdapter);
                            mRecyclerView.smoothScrollToPosition(mRecyclerView.getAdapter().getItemCount());
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        error.printStackTrace();
                    }
                }
        );
        queue.add(request);
    }
}
