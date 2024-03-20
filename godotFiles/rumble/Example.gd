class_name ExampleClient extends Node

var client = SocketIOClient
var backendURL: String

func _ready():
	# prepare URL
	backendURL = "http://localhost:3000/socket.io"
	client = SocketIOClient.new(backendURL)
	client.on_engine_connected.connect(on_socket_ready)
	client.on_connect.connect(on_socket_connect)
	client.on_event.connect(on_socket_event)
	add_child(client)

func _exit_tree():
	# optional: disconnect from socketio server
	client.socketio_disconnect()

func on_socket_ready(_sid: String):
	# connect to socketio server when engine.io connection is ready
	client.socketio_connect()

func on_socket_connect(_payload: Variant, _name_space, error: bool):
	if error:
		push_error("Failed to connect to backend!")
	else:
		print("Socket connected")

func on_socket_event(event_name: String, payload: Variant, _name_space):
	var player = get_parent().get_node("Warrior")
	var data = JSON.parse_string(payload)
	if(data.warrior):
		player.position = Vector2(data.warrior.position.x, data.warrior.position.y)
	print("Received ", event_name, " 2 ", data)
	print(player)

	# respond hello world
	client.socketio_send("hello", "world")
