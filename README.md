# Rama con los contenidos para ejecutar Bahmni Docker localmente

Todos las instrucciones en esta rama hacen referencia a la [Wiki] para ejecutar Bahmni en Docker. (https://bahmni.atlassian.net/wiki/spaces/BAH/pages/299630726/Running+Bahmni+on+Docker) 

## Ejecutar Bahmni LITE usando docker compose: 
1. Navegar en la terminal de linux a la carpeta correspondiente, en este caso: `cd bahmni-lite`.
2. Se puede ejecutar comandos docker compose directamente:
```shell
docker compose up --env-file .env
```
3. Antes de ejecutar los comandos del punto anterior, hay que asegurarse de que el archivo `.env` en la carpeta "/bahmni-lite" esta correctamente configurada con el perfil correcto.



## Configuración para Bahmni Lite, Variables de Entorno 
Los archivos `.env` & `.env.dev` son usados para configurar las variables de entorno de Bahmni Lite Docker. Originalmente el archivo .env es usado para apuntar a los tags de imágenes '1.0.0', las que son las versiones estables y testeadas de Bahmni Lite v1.0.0. Teniendo esto en consideración se agregó a este las customizaciones deseadas, como agregar la ruta de los directorios: "clinic-config", "bahmniapps", "proxy". Y el archivo 'env.dev' apunta las veriones de imágenes más recientes  ('latest'), este no se utilizó más que como respaldo para revisar rápidamente si los cambios realizados no desarmaban la estructura del arcchivo '.env'.  


- En caso de querer utilizar las imagenes más recientes (`latest`), se puede ejecutar el script `run-bahmni.sh`, junto a: `.env.dev`.
```shell
run-bahmni.sh .env.dev
# o en caso de querer utilizar el comando docker compose:
docker compose up --env-file .env.dev
```

# BAHMNI-SIMSADI

--------
En esta rama se encuentra los archivos utilizados para la creación de las imagenes customizadas de Bahmni LITE, lo más importante en estos archivos son los cambios realizados en el archivo ".env" y el archivo "docker-compose-yml", 

----
