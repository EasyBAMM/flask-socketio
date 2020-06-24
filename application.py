from flask import Flask, render_template, url_for
from flask_socketio import SocketIO, send, emit
from time import localtime, strftime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route("/")
def chat():
    return render_template('chat.html')


# 메시지를 클라이언트에서 입력 받으면 서버 쪽 출력 & 클라이언트로 다시 브로드캐스팅
@socketio.on('message')
def message(data):

    print(f"\n\n{data}\n\n")

    #print(type(data))
    
    if type(data) is dict:
        send_data = {'msg' : data['msg'], 
                'username' : data['username'], 
                'time_stamp' : strftime('%b-%d %I:%M%p', localtime())}
        send(send_data, broadcast=True)
    
    #emit('some-event', 'this is a custom event message')

    

if __name__ == '__main__':
    socketio.run(app, debug=True)