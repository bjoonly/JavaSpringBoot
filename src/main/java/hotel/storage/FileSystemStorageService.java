package hotel.storage;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class FileSystemStorageService implements StorageService {
    private final Path rootLocation;

    public FileSystemStorageService(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
    }

    @Override
    public void init() {
        try {
            if (!Files.exists((rootLocation)))
                Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new StorageException(("Creating directory failed"));
        }
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = rootLocation.resolve(filename);
            ;
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException("Could not read file: " + filename);

            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    @Override
    public String save(String base64) {
        try {
            if (base64.isEmpty()) {
                throw new StorageException("Empty base64.");
            }
            UUID uuid = UUID.randomUUID();
            String randomFileName = uuid.toString() + ".jpg";
            String[] charArray = base64.split(",");
            Base64.Decoder decoder = Base64.getDecoder();
            byte[] bytes = new byte[0];
            bytes = decoder.decode(charArray[1]);
            String folder = rootLocation.toString() + "/" + randomFileName;
            new FileOutputStream(folder).write(bytes);
            return randomFileName;
        } catch (IOException e) {
            throw new StorageException("Problem of transformation and preservation base64. ", e);
        }
    }

    @Override
    public void delete(String name) {
        try {
            Files.deleteIfExists(Paths.get(rootLocation.toString(), name));
        } catch (Exception ex) {
            throw new StorageException("File with name" + name + "doesn't exist.", ex);
        }
    }
}
