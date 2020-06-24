document.addEventListener('DOMContentLoaded',() => {
    
    // 서버와 연결
    var socket = io.connect('http://' + document.domain + ':' + location.port);

    
    // 연결 성공 시, 서버 쪽 확인 메시지
    socket.on('connect', () => {
        socket.send("I am connected");
    });

    // 서버 쪽에서 메시지 받음
    socket.on('message', data => {
        //console.log('Message received: ' + data)
        const p = document.createElement('p');
        const span_username = document.createElement('span');
        const span_timestamp = document.createElement('span');
        const br = document.createElement('br');

        span_username.innerHTML = data['username'];
        span_timestamp.innerHTML = data['time_stamp'];
        p.innerHTML = span_username.outerHTML + br.outerHTML + data['msg'] + br.outerHTML + data['time_stamp'] + br.outerHTML;
        document.querySelector('#display-message-section').append(p);
    });

    // 다른 이벤트
    // socket.on('some-event', data => {
    //     console.log(data);
    // });

    // 서버로 데이터 전송
    document.querySelector('#send_message').onclick = () => {

        input_data = { 'username' : document.querySelector('#user_name').value,
                    'msg' : document.querySelector('#user_message').value }
        socket.send( input_data );
    }
})