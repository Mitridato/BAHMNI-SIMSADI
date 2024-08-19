# BAHMNI-SIMSADI

## Componente para la recuperación y envio de ordenes de exámenes (radiológicos & de laboratorio), generados durante la atención de Telemedicina, a través de BAHMNI.  
--------
###### Repositorio del proyecto de título en el área de Informática Médica de la escuela de Ingeniería Civil Biomédica de la Universidad de Valparaíso, , creado por Nicolás Muñoz Munizaga.

----

# 1. **CONTEXTO** : ¿Qué es BAHNMI y por qué lo estamos utilizando?  
  BAHMNI es tanto una distribución de OpenMRS, lo cual le entrega la funcionalidad de registro médico electronico (RME), como un sistema de Información Hospitalaria. Además es un software de código abierto, lo cual nos abre posibilidades de configurarlo a nuestra conveniencia para agregarle componentes como es el objetivo de este proyecto, adecuarlo a distintos contextos editando desde el idioma hasta las listas de medicamentos que se pueden prescribir. 




----
# 2. **"LO QUIERO, ¿CÓMO LO CONSIGO?**
  Para empezar se debe preparar un ambiente de desarrollo, para esto se siguieron estos pasos: 
  
*  Instalar una máquina virtual (Oracle VM) y en esta cargar la version estable (LTS) de Ubuntu (22.0.4)
*  [Sitio de descarga de la Máquina Virtual](https://www.virtualbox.org/wiki/Downloads "Descargar Máquina Virtual")
*  _Idealmente establecer alrededor de 40 GB de almacenamiento a la MV y unos 4 GB de memoria RAM_
  
### 2.1 Instalar tomcat
Para esto, primero se actualizan la lista de paquetes de software disponibles en los repositorios oficiales. Luego, se instala Java Runtime y el kit de desarrollo de Java. Finalmente se instala tomcat. 
```
sudo apt-get update
sudo apt-get install openjdk-11-jre-headless
sudo apt install tomcat9 tomcat9-admin
```
*  Una vez lista esta base necesitaremos instalar algunas herramientas:
*  [Descarga Docker](https://docs.docker.com/engine/install/ubuntu/)

### 2.2 Establecer repositorio apt de Docker
```
# Añadir llave gpg (certificado) oficial:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Añadir el repositorio a las fuentes Apt:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

### 2.3 Instalar los paquetes de Docker
```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# La documentación sugiere verificar que la instalación de Docker Engine hay sido exitosa ejecutando el siguiente comando:
sudo docker run hello-world
# ó
docker --v
```

###  2.4 Instalar docker compose
```
sudo apt-get update
sudo apt-get install docker-compose-plugin
# Para revisar que se instaló correctamente y la versión que quedó en el entorno se puede usar el comando:
docker compose version
```

----
Con estos pasos listos se puede clonar el repositorio en la MV, y una vez dentro del directorio clonado, en este caso dentro de /bahmni-lite, dar paso a construir la imagen con los comandos: 
----

```
docker compose build
docker compose up -d

# Para revisar el estado de los contenedores se utiliza
docker ps
```
