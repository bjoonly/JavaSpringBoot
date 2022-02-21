package hotel.storage;


import org.springframework.core.io.Resource;

public interface StorageService {
    void init();

    Resource loadAsResource(String filename);

    String save(String base64);

    void delete(String name);
}

