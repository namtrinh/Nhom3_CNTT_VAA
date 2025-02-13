package org.galaxy.backend.Service.ReadExel;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.galaxy.backend.Model.Category;
import org.galaxy.backend.Model.Product;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ReadExelProduct {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"Product ID", "Name", "SEO Title", "Image", "Quantity", "Price"};
    static String SHEET = "abc";

    public static boolean hasExcelFormat(MultipartFile file) {
        if (!TYPE.equals(file.getContentType())) {
            return false;
        }
        return true;
    }

    public static List<Product> excelToStuList(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();
            List<Product> productList = new ArrayList<>();
            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();
                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }
                Iterator<Cell> cellsInRow = currentRow.iterator();
                Product product = new Product();
                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();
                    switch (cellIdx) {
                        case 0:
                            product.setProduct_id(currentCell.getStringCellValue());
                            break;
                        case 1:
                            product.setName(currentCell.getStringCellValue());
                            break;
                        case 2:
                            product.setSeotitle(currentCell.getStringCellValue());
                            break;
                        case 3:
                            product.setImage(currentCell.getStringCellValue());
                            break;
                        case 4:
                            product.setQuantity((int) currentCell.getNumericCellValue());
                            break;
                        case 5:
                            product.setPrice((double) currentCell.getNumericCellValue());
                            break;
                        case 6:
                            if (currentCell.getCellType() == CellType.STRING) {
                                Category category = new Category();
                                category.setCategory_id(currentCell.getStringCellValue());
                                product.setCategory(category);
                            } else {
                                log.warn("Invalid category_id at cell: " + cellIdx);
                            }
                            break;
                        default:
                            log.warn("Unknown cell index: " + cellIdx);
                            break;
                    }
                    cellIdx++;
                }
                if (product.getQuantity() > 0) {
                    product.setStockStatus(Product.StockStatusPr.In_Stock);
                } else if (product.getQuantity() == 0) {
                    product.setStockStatus(Product.StockStatusPr.Out_of_Stock);
                }
                productList.add(product);
            }
            workbook.close();
            return productList;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }
}
