# Instrucciones de uso

## Instalación
Para correr el front:
```
docker compose up --build -d
```

### Conexión con el backend
En caso de error, uno de los posibles problemas es la dirección del backend, para arreglarla deben bajar el container con `docker compose down` (esto en el directorio base de la app), luego deben editar la url del backend en *src/utils.js*.

Ejecutar
```
docker compose up --build -d
```

Con esto el front estará andando en el puerto que hayan designado en el *docker-compose.yml*


# Información general sobre servicios de primos

Todos los servicios que tiene Primos están o deberían estar alojados en prime.
Prime es una máquina dentro del departamento de infromática.

### Para acceder a prime desde la red de la U:
- Acceder a APU
- Desde APU ejecutar:
```
ssh primo@prime
```