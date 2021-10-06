# Infra

Ao subir a aplicação, tente até funcionar, pode haver alguns erros de `Error: connect ECONNREFUSED`, ou `Error: Handshake inactivity timeout`, mas após algumas tentativas, a aplicação sobe. Isso ocorre por que o backend precisa de comunicação com o Database, se o DB não esta up, é normal lançar erro. Isso ocorre tanto no `kubernetes`, quanto no `docker-compose`.

## Docker-compose

Copiar o arquivo `docker-compose.yaml` para a raiz do projeto.

`docker-compose up` para subir.
`docker-compose down` para descer.
`docker-compose up --build` para rebuidar as imagens.
`docker-compose up --build --force-recreate` para recriar tudo do 0.

---

## Kubernetes

Copiar o arquivo skaffold.yaml da infra, para a raiz do projeto.

- `minkube start`
- `minikube addons enable ingress`
- `eval $(minikube docker-env)`
- `skaffold dev`

---

## Hosts

Cada host, pode ser utilizado somente UMA VEZ, pois se subir o `docker-compose` com hosts igual ao do `kubernetes`, a aplicação não terá comunicação. Para resolver isso comente o hosts de acordo com o tipo do deploy.

No caso do `docker-compose`, acessar localhost será possível.

```bash
# /etc/hosts

# Kubernetes
adminer.local $(minikube ip)
app.local $(minikube ip)

# Docker-compose
adminer.local 127.0.0.1
app.local 127.0.0.1

```
