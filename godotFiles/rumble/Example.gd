class_name ExampleClient extends Node

var client = SocketIOClient
var backendURL: String

var unit_dict = { }
var metal_warrior_scene = preload("res://warrior.tscn")


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

func rendersAttackRadius(instance, unit):
	var scale = unit.attackRadius/100
	instance.get_node("AttackRadius").scale.x = scale
	instance.get_node("AttackRadius").scale.y = scale


func rendersHealthBar(instance, unit):
	var healthBar = instance.get_node("HealthBar")
	healthBar.max_value = unit.maxHealth
	healthBar.value = unit.health

func spawnUnit(unit):
	unit_dict[unit.id] = unit
	var name = unit.name
	var instance
	if(name == "metal_warrior"):
		instance = metal_warrior_scene.instantiate()

	instance.position = Vector2(unit.position.x, unit.position.y)
	instance.name = unit.id

	rendersAttackRadius(instance, unit)
	rendersHealthBar(instance, unit)
	get_parent().add_child(instance)


func on_socket_event(event_name: String, payload: Variant, _name_space):
	var data = JSON.parse_string(payload)
	if(data.units):
		var units = data.units
		print(unit_dict)
		for k in units:
			var serverUnit = units[k]
			var spawnServerUnit = true

			for key in unit_dict:
				var clientUnit = unit_dict[key]
				if(serverUnit.id == clientUnit.id):
					spawnServerUnit = false

			if(spawnServerUnit):
				spawnUnit(serverUnit)

			var instance = get_parent().get_node(serverUnit.id)

			#
			if(abs(serverUnit.position.x - instance.position.x) > 5 || abs(serverUnit.position.y - instance.position.y) > 5):
				instance.position = Vector2(serverUnit.position.x, serverUnit.position.y)
			instance.goToPosition(serverUnit.position.x,serverUnit.position.y, serverUnit.speed)
			rendersHealthBar(instance, serverUnit)

		for key in unit_dict:
			var clientUnit = unit_dict[key]
			var killClientUnit = true
			for k in units:
				var serverUnit = units[k]
				if(serverUnit.id == clientUnit.id):
					killClientUnit = false

			if(killClientUnit):
				var instance = get_parent().get_node(clientUnit.id)
				instance.queue_free()
				unit_dict.erase(key)

	client.socketio_send("hello", "world")


func _on_button_pressed():
	client.socketio_send("spawn", {"unit_name": "metal_warrior"})
	pass # Replace with function body.
