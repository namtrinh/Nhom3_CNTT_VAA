package org.galaxy.backend.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file) {
        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("secure_url").toString(); // URL của hình ảnh sau khi tải lên
        } catch (IOException e) {
            throw new RuntimeException("Error uploading file to Cloudinary: " + e.getMessage(), e);
        }
    }

    public String deleteFile(String imageUrl) {
        // Trích xuất publicId từ URL
        String publicId = extractPublicIdFromUrl(imageUrl);

        try {
            // Gọi Cloudinary API để xóa hình ảnh với publicId
            Map<?, ?> result = cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            String resultStatus = result.get("result").toString();

            // Kiểm tra kết quả trả về từ Cloudinary
            if ("ok".equals(resultStatus)) {
                return "File deleted successfully";
            } else {
                return "Failed to delete file: " + resultStatus;
            }
        } catch (IOException e) {
            throw new RuntimeException("Error deleting file from Cloudinary: " + e.getMessage(), e);
        }
    }


    public String extractPublicIdFromUrl(String url) {
        // Tách URL thành các phần, lấy phần cuối cùng (tên file và publicId)
        String[] parts = url.split("/");
        String fileName = parts[parts.length - 1];

        // Tách phần mở rộng file (ví dụ .jpg) và lấy publicId
        return fileName.split("\\.")[0];
    }


}
