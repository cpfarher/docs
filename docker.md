# Managing Two Docker Installations on Ubuntu

## Can You Have Two Docker Instances Running?

Yes, it's possible to have **two separate Docker installations** running on Ubuntu:

1. **Docker Engine (**\`\`**)** – The traditional Linux-native Docker.
2. **Docker Desktop for Linux** – A newer installation that runs inside a virtualized environment.

### Why You Don’t See Your Previous Containers

- Docker Desktop uses a different **Docker context** (`desktop-linux`), separate from the system-wide **Docker Engine (**\`\`**)**.
- Your previous containers were likely running in **Docker Engine**, while Docker Desktop is now using its own environment.

### Checking if Both Are Running

#### **1. List Available Docker Contexts**

```bash
docker context ls
```

Example output:

```
NAME                DESCRIPTION                               DOCKER ENDPOINT
default             Current DOCKER_HOST based configuration  unix:///var/run/docker.sock
desktop-linux       Docker Desktop                           unix:///home/user/.docker/desktop/docker.sock
```

#### **2. Check Running Containers in Each Context**

- **Docker Engine (**\`\`**)**:
  ```bash
  docker --context default ps -a
  ```
- **Docker Desktop (**\`\`**)**:
  ```bash
  docker --context desktop-linux ps -a
  ```

### Switching Between Docker Installations

- Use **Docker Engine** (`default`):
  ```bash
  docker context use default
  ```
- Use **Docker Desktop** (`desktop-linux`):
  ```bash
  docker context use desktop-linux
  ```

## Benefits of Each Option

### **Docker Engine (**\`\`**)**

✔ Pros:

- **Runs natively on Linux** (better performance).
- **More control** over networking, storage, and system services.
- **Better suited for production workloads**.
- **Lower resource usage** than Docker Desktop.

❌ Cons:

- No built-in GUI (requires CLI or Portainer).
- More manual configuration needed.

### **Docker Desktop (**\`\`**)**

✔ Pros:

- **Built-in GUI (Dashboard)**.
- **Comes with Docker Compose v2 and Kubernetes pre-installed**.
- **Easier to manage for developers**.

❌ Cons:

- Uses **virtualization**, so performance is lower.
- **Consumes more system resources**.
- Requires a **Docker account** for some features.

### **Can You Use Both?**

Yes! You can switch between them using Docker contexts.

## Using Portainer with Docker Desktop

### **Option 1: Running Portainer Inside Docker Desktop**

1. **Switch to Docker Desktop context**:
   ```bash
   docker context use desktop-linux
   ```
2. **Run Portainer**:
   ```bash
   docker run -d \
     --name portainer \
     --restart always \
     -p 8000:8000 -p 9443:9443 \
     -v ~/.docker/desktop/docker.sock:/var/run/docker.sock \
     -v portainer_data:/data \
     portainer/portainer-ce
   ```
3. **Access Portainer** at: [https://localhost:9443](https://localhost:9443)

### **Option 2: Running Portainer on Docker Engine and Managing Desktop Linux**

1. **Run Portainer on Docker Engine (**\`\`**)**:
   ```bash
   docker --context default run -d \
     --name portainer \
     --restart always \
     -p 8000:8000 -p 9443:9443 \
     -v /var/run/docker.sock:/var/run/docker.sock \
     -v portainer_data:/data \
     portainer/portainer-ce
   ```
2. \*\*Manually Connect to \*\*\`\` (May Require Portainer Business Edition):
   - Open **Portainer UI (**\`\`**)**.
   - Go to **Settings → Enable Experimental Features**.
   - Try adding a new **local environment** with:
     ```bash
     unix:///home/your-user/.docker/desktop/docker.sock
     ```

### **Final Recommendation**

- **Use Docker Engine (**\`\`**)** for production and better performance.
- **Use Docker Desktop (**\`\`**)** for easier management and GUI support.
- **Use Portainer** to manage both, but remote management might require **Portainer Business Edition**.

Let me know if you need help setting it up! 🚀

