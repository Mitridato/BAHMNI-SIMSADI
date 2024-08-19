
# Bahmni Docker

Refer this [Wiki Page](https://bahmni.atlassian.net/wiki/spaces/BAH/pages/299630726/Running+Bahmni+on+Docker) for Running Bahmni on Docker for detailed instructions.

## Running Bahmni LITE or STANDARD using docker compose: 
1. Navigate to the relevant subfolder for your desired configuration. For example: `cd bahmni-lite`.
2. Execute the script: `./run-bahmni.sh`. This script provides various options such as start, stop, view logs, pull updates, reset, etc.
3. Before executing the above commands, ensure that your `.env` file in the sub-folder is correctly configured with the appropriate PROFILE.

Alternatively, if you wish to use docker compose commands directly, you can use the --env-file option to pass the environment variables files:
```shell
docker compose up --env-file .env
```

## Environment Variable Configuration For Bahmni Lite
The `.env` and `.env.dev` files are used for configuring environment variables for the Bahmni Lite Docker setup. 

The `.env` file points to the `1.0.0` image tag, which represents the stable and tested version of Bahmni Lite v1.0.0. We recommend using these images for production purposes. 
The `.env.dev` file points to the `latest` image version, which provides the most recent updates for development and testing purposes.

- By default `run-bahmni.sh` script runs with the `.env`, that uses the `1.0.0` images
```shell
run-bahmni.sh
```

- Instead if you wish to use the `latest` images, run the `run-bahmni.sh` script with the argument `.env.dev`
```shell
run-bahmni.sh .env.dev
```

- Additionally, you have the flexibility to create your own environment variable configuration. To do this, create a custom a `.env` file (eg: `.env.local`) and run the run-bahmni.sh script with the `.env.local` argument:
```shell
run-bahmni.sh .env.local
```

Please choose the appropriate environment variables file based on your requirements and make sure the respective `.env` or `.env-dev` file is properly configured before running the commands.

For detailed instructions and further information, please refer to the [Wiki Page](https://bahmni.atlassian.net/wiki/spaces/BAH/pages/299630726/Running+Bahmni+on+Docker) mentioned above.
=======
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
  


*  Una vez lista esta base necesitaremos instalar algunas herramientas:
*  [Descarga Docker](https://docs.docker.com/engine/install/ubuntu/)

*
>>>>>>> 7610b95e68d50c37e224315b844c823f97faf303
