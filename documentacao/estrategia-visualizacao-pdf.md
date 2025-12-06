# Estratégia de Visualização e Armazenamento de PDFs no SMD

**Data:** 06/12/2025  
**Versão:** 1.0  
**Autor:** Sistema de Manuais Digitais - SMD

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Opções de Armazenamento](#opções-de-armazenamento)
3. [Opções de Visualização](#opções-de-visualização)
4. [Comparativo de Soluções](#comparativo-de-soluções)
5. [Recomendação Final](#recomendação-final)
6. [Implementação Recomendada](#implementação-recomendada)
7. [Roadmap de Implementação](#roadmap-de-implementação)

---

## 🎯 Visão Geral

O SMD precisa de uma solução robusta para:
- **Armazenar** documentos PDF de forma segura e escalável
- **Visualizar** PDFs com alta qualidade e nitidez
- **Gerenciar** permissões de acesso por tipo de usuário
- **Permitir** anotações e preenchimento de campos

### Requisitos Principais

#### Armazenamento
- ✅ Segurança (controle de acesso)
- ✅ Escalabilidade (crescimento do volume)
- ✅ Custo-benefício
- ✅ Backup automático
- ✅ Versionamento de documentos

#### Visualização
- ✅ Alta qualidade/nitidez
- ✅ Responsivo (mobile + desktop)
- ✅ Controles de navegação (zoom, página, busca)
- ✅ Sem necessidade de download
- ✅ Preenchimento de campos interativos
- ✅ Performance rápida

---

## 💾 Opções de Armazenamento

### 1. **Armazenamento Local (Sistema de Arquivos)**

#### Como Funciona
```
_backend/
  uploads/
    documentos/
      {ano}/
        {mes}/
          {uuid}-{nome-original}.pdf
```

#### Prós ✅
- Controle total dos arquivos
- Sem custos adicionais de cloud
- Acesso direto e rápido
- Privacidade garantida
- Simplicidade de implementação

#### Contras ❌
- Responsabilidade de backup manual
- Escalabilidade limitada ao disco
- Sem CDN nativo
- Necessita configurar servlets para servir arquivos
- Risco de perda em caso de falha de hardware

#### Implementação Backend (Spring Boot)
```java
@Configuration
public class FileStorageConfig {
    @Value("${app.upload.dir:uploads/documentos}")
    private String uploadDir;
    
    @Bean
    public Path uploadPath() throws IOException {
        Path path = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(path);
        return path;
    }
}

@Service
public class FileStorageService {
    private final Path fileStorageLocation;
    
    public String storeFile(MultipartFile file) {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path targetLocation = fileStorageLocation.resolve(fileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }
    
    public Resource loadFileAsResource(String fileName) {
        Path filePath = fileStorageLocation.resolve(fileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        return resource;
    }
}

@RestController
@RequestMapping("/api/files")
public class FileController {
    
    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
            .path("/api/files/download/")
            .path(fileName)
            .toUriString();
        return ResponseEntity.ok(new UploadResponse(fileName, fileDownloadUri));
    }
    
    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        Resource resource = fileStorageService.loadFileAsResource(fileName);
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_PDF)
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
            .body(resource);
    }
}
```

#### Custo Estimado
- **Inicial:** R$ 0 (usa infraestrutura existente)
- **Mensal:** R$ 0
- **Escalabilidade:** Limitada ao espaço em disco

---

### 2. **Google Drive API**

#### Como Funciona
```
Google Drive Storage
  └── SMD-Documentos/
      ├── Fluxo-1/
      │   ├── documento-1.pdf
      │   └── documento-2.pdf
      └── Fluxo-2/
          └── documento-3.pdf
```

#### Prós ✅
- 15GB gratuitos por conta Google
- Backup automático em nuvem
- Compartilhamento facilitado
- Integração com Google Docs Viewer
- Versionamento nativo
- CDN global do Google

#### Contras ❌
- Dependência de serviço externo
- Limitações de quota (750GB upload/dia)
- Requer autenticação OAuth 2.0
- Complexidade na gestão de permissões
- Custos após 15GB (R$ 9,99/mês para 100GB)

#### Implementação Backend
```java
// pom.xml
<dependency>
    <groupId>com.google.apis</groupId>
    <artifactId>google-api-services-drive</artifactId>
    <version>v3-rev20230822-2.0.0</version>
</dependency>

@Service
public class GoogleDriveService {
    
    private Drive driveService;
    
    @PostConstruct
    public void init() throws IOException {
        GoogleCredential credential = GoogleCredential.fromStream(
            new FileInputStream("credentials.json"))
            .createScoped(Collections.singleton(DriveScopes.DRIVE_FILE));
        
        driveService = new Drive.Builder(
            GoogleNetHttpTransport.newTrustedTransport(),
            JacksonFactory.getDefaultInstance(),
            credential)
            .setApplicationName("SMD")
            .build();
    }
    
    public String uploadFile(MultipartFile file, String folderId) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName(file.getOriginalFilename());
        fileMetadata.setParents(Collections.singletonList(folderId));
        
        FileContent mediaContent = new FileContent("application/pdf", 
            new java.io.File(file.getOriginalFilename()));
        
        File uploadedFile = driveService.files().create(fileMetadata, mediaContent)
            .setFields("id, webViewLink, webContentLink")
            .execute();
        
        return uploadedFile.getId();
    }
    
    public String getViewerUrl(String fileId) {
        return "https://drive.google.com/file/d/" + fileId + "/view";
    }
    
    public void setPermissions(String fileId, String email, String role) throws IOException {
        Permission permission = new Permission()
            .setType("user")
            .setRole(role) // reader, writer, commenter
            .setEmailAddress(email);
        
        driveService.permissions().create(fileId, permission).execute();
    }
}
```

#### Frontend - Integração
```javascript
// Visualizar PDF do Google Drive
const googleDriveFileId = documento.arquivo; // ID retornado pelo backend

// Opção 1: Viewer Embed
<iframe 
  src={`https://drive.google.com/file/d/${googleDriveFileId}/preview`}
  width="100%" 
  height="600px"
  allow="autoplay"
></iframe>

// Opção 2: Google Docs Viewer (funciona com PDFs não públicos)
<iframe 
  src={`https://docs.google.com/viewer?srcid=${googleDriveFileId}&pid=explorer&efh=false&a=v&chrome=false&embedded=true`}
  width="100%" 
  height="600px"
></iframe>
```

#### Custo Estimado
- **Gratuito:** 15GB
- **100GB:** R$ 9,99/mês
- **200GB:** R$ 14,99/mês
- **2TB:** R$ 49,99/mês

---

### 3. **Amazon S3 (AWS)**

#### Prós ✅
- Altamente escalável
- Durabilidade 99.999999999%
- Versionamento de objetos
- CloudFront CDN integrado
- Controle fino de permissões (IAM)

#### Contras ❌
- Custo por GB armazenado e transferido
- Complexidade de configuração
- Requer conhecimento AWS

#### Custo Estimado
- **Armazenamento:** US$ 0,023/GB/mês (~R$ 0,11/GB)
- **Transferência:** Primeiros 100GB grátis, depois US$ 0,09/GB
- **Exemplo:** 50GB = ~R$ 5,50/mês

---

## 👁️ Opções de Visualização

### 1. **Google Docs Viewer** ⭐ RECOMENDADO

#### Como Funciona
O Google oferece um serviço gratuito de visualização de documentos que renderiza PDFs com alta qualidade.

#### URLs de Visualização

**Para arquivos públicos (URL direta):**
```
https://docs.google.com/viewer?url={URL_DO_PDF}&embedded=true
```

**Para arquivos do Google Drive:**
```
https://docs.google.com/viewer?srcid={FILE_ID}&pid=explorer&efh=false&a=v&chrome=false&embedded=true
```

**Para arquivos locais (via proxy):**
```
https://docs.google.com/viewer?url={SEU_BACKEND_URL}/api/files/proxy/{fileId}&embedded=true
```

#### Implementação Frontend
```jsx
import { useState } from 'react';
import { Dialog, DialogContent, CircularProgress } from '@mui/material';
import { FileText, Download, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

const PDFViewer = ({ fileUrl, fileName }) => {
  const [loading, setLoading] = useState(true);
  
  // URL do Google Docs Viewer
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
  
  return (
    <div className="relative w-full h-[600px] bg-gray-900 rounded-xl overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <CircularProgress sx={{ color: '#10b981' }} />
          <p className="text-white ml-4">Carregando PDF...</p>
        </div>
      )}
      
      <iframe
        src={viewerUrl}
        className="w-full h-full border-0"
        title={fileName}
        onLoad={() => setLoading(false)}
      />
      
      {/* Toolbar */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={() => window.open(fileUrl, '_blank')}
          className="p-2 bg-emerald-600 rounded-lg hover:bg-emerald-700"
        >
          <Download size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
```

#### Prós ✅
- **Gratuito** e sem limites
- **Alta qualidade** de renderização
- **Sem biblioteca** JavaScript necessária
- **Responsivo** nativamente
- **Suporta** zoom, navegação, busca
- **Funciona** com URLs públicas

#### Contras ❌
- Requer URL pública ou proxy
- Dependência de serviço externo (Google)
- Sem personalização de UI
- Necessita conexão com internet

---

### 2. **React-PDF (PDF.js)**

#### Como Funciona
Biblioteca React que usa PDF.js da Mozilla para renderizar PDFs diretamente no canvas.

```bash
npm install react-pdf pdfjs-dist
```

#### Implementação
```jsx
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configurar worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewerLocal = ({ file }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center bg-gray-900 p-4 rounded-xl">
      {/* Controles */}
      <div className="flex gap-4 mb-4 bg-gray-800 p-3 rounded-lg">
        <button 
          onClick={() => setPageNumber(p => Math.max(1, p - 1))}
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-emerald-600 text-white rounded"
        >
          Anterior
        </button>
        
        <span className="text-white flex items-center">
          Página {pageNumber} de {numPages}
        </span>
        
        <button 
          onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
          disabled={pageNumber >= numPages}
          className="px-4 py-2 bg-emerald-600 text-white rounded"
        >
          Próxima
        </button>
        
        <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))}>-</button>
        <span className="text-white">{Math.round(scale * 100)}%</span>
        <button onClick={() => setScale(s => Math.min(2.0, s + 0.1))}>+</button>
      </div>

      {/* Documento */}
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<CircularProgress />}
      >
        <Page 
          pageNumber={pageNumber} 
          scale={scale}
          renderTextLayer={true}
          renderAnnotationLayer={true}
        />
      </Document>
    </div>
  );
};

export default PDFViewerLocal;
```

#### Prós ✅
- **Controle total** da UI
- **Personalização** completa
- **Offline** support
- **Extração de texto** para busca
- **Anotações** e formulários interativos
- **Sem dependência** de serviços externos

#### Contras ❌
- Bundle size maior (~500KB)
- Performance em PDFs grandes
- Necessita configuração do worker
- Mais complexo de implementar

---

### 3. **PSPDFKit** (Comercial)

#### Como Funciona
Biblioteca comercial enterprise-grade para visualização e edição de PDFs.

#### Prós ✅
- Qualidade premium
- Anotações avançadas
- Assinaturas digitais
- Preenchimento de formulários
- Sincronização em tempo real

#### Contras ❌
- **Custo:** US$ 100-500/mês
- Overkill para necessidades básicas

---

## 📊 Comparativo de Soluções

| Critério | Local + Google Viewer | Google Drive API | S3 + React-PDF | PSPDFKit |
|----------|----------------------|------------------|----------------|----------|
| **Custo Inicial** | R$ 0 | R$ 0 | ~R$ 20 setup | ~R$ 500/mês |
| **Custo Mensal** | R$ 0 | R$ 0-10 | R$ 5-50 | R$ 500+ |
| **Qualidade Visualização** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Facilidade Implementação** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Escalabilidade** | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Controle Total** | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Offline Support** | ❌ | ❌ | ✅ | ✅ |
| **Backup Automático** | ❌ | ✅ | ✅ | ✅ |
| **Anotações** | ❌ | ❌ | ✅ | ✅ |
| **Responsivo** | ✅ | ✅ | ✅ | ✅ |

---

## 🏆 Recomendação Final

### **Solução Híbrida: Local Storage + Google Docs Viewer**

#### Por quê?

1. **Custo Zero** - Não adiciona despesas mensais
2. **Alta Qualidade** - Google Viewer renderiza PDFs perfeitamente
3. **Controle Total** - Arquivos no servidor próprio
4. **Simples de Implementar** - Menos complexidade
5. **Escalável** - Pode migrar para S3 futuramente se necessário

#### Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │  DocumentoDetail.jsx                                │    │
│  │  ┌──────────────────────────────────────────┐      │    │
│  │  │  <PDFViewer>                              │      │    │
│  │  │    src="https://docs.google.com/viewer?  │      │    │
│  │  │         url={backendUrl}/api/files/      │      │    │
│  │  │         proxy/{fileId}&embedded=true"    │      │    │
│  │  └──────────────────────────────────────────┘      │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↓ HTTP GET
┌─────────────────────────────────────────────────────────────┐
│                     Backend (Spring Boot)                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │  FileController.java                                │    │
│  │  @GetMapping("/api/files/proxy/{fileId}")          │    │
│  │  → Valida permissões do usuário                    │    │
│  │  → Busca arquivo no sistema local                  │    │
│  │  → Retorna com header CORS adequado                │    │
│  └────────────────────────────────────────────────────┘    │
│                            ↓                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │  uploads/documentos/{ano}/{mes}/{uuid}.pdf         │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Implementação Recomendada

### Fase 1: Backend - Upload e Armazenamento

#### 1.1. application.properties
```properties
# Configuração de upload
spring.servlet.multipart.enabled=true
spring.servlet.multipart.max-file-size=50MB
spring.servlet.multipart.max-request-size=50MB
app.upload.dir=uploads/documentos
```

#### 1.2. FileStorageService.java
```java
package br.com.systemmanualdigital.services.file;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService(@Value("${app.upload.dir}") String uploadDir) throws IOException {
        this.fileStorageLocation = Paths.get(uploadDir)
                .toAbsolutePath().normalize();
        Files.createDirectories(this.fileStorageLocation);
    }

    public String storeFile(MultipartFile file) throws IOException {
        // Validações
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Arquivo vazio");
        }
        
        String contentType = file.getContentType();
        if (!"application/pdf".equals(contentType)) {
            throw new IllegalArgumentException("Apenas arquivos PDF são permitidos");
        }

        // Criar estrutura de pastas: ano/mes
        LocalDate now = LocalDate.now();
        Path yearMonth = fileStorageLocation
            .resolve(String.valueOf(now.getYear()))
            .resolve(String.format("%02d", now.getMonthValue()));
        Files.createDirectories(yearMonth);

        // Gerar nome único
        String originalFileName = file.getOriginalFilename();
        String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
        String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

        // Salvar arquivo
        Path targetLocation = yearMonth.resolve(uniqueFileName);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        // Retornar caminho relativo
        return now.getYear() + "/" + String.format("%02d", now.getMonthValue()) + "/" + uniqueFileName;
    }

    public Resource loadFileAsResource(String filePath) throws IOException {
        try {
            Path file = fileStorageLocation.resolve(filePath).normalize();
            Resource resource = new UrlResource(file.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                throw new IOException("Arquivo não encontrado: " + filePath);
            }
        } catch (MalformedURLException ex) {
            throw new IOException("Arquivo não encontrado: " + filePath, ex);
        }
    }

    public void deleteFile(String filePath) throws IOException {
        Path file = fileStorageLocation.resolve(filePath).normalize();
        Files.deleteIfExists(file);
    }
}
```

#### 1.3. FileController.java
```java
package br.com.systemmanualdigital.resources.file;

import br.com.systemmanualdigital.services.file.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*") // Necessário para Google Docs Viewer
public class FileController {

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
        String filePath = fileStorageService.storeFile(file);
        
        String fileUrl = "http://localhost:8080/api/files/proxy/" + filePath;
        
        return ResponseEntity.ok(new UploadResponse(filePath, fileUrl));
    }

    @GetMapping("/proxy/{year}/{month}/{fileName:.+}")
    public ResponseEntity<Resource> getFile(
            @PathVariable String year,
            @PathVariable String month,
            @PathVariable String fileName) throws IOException {
        
        String filePath = year + "/" + month + "/" + fileName;
        Resource resource = fileStorageService.loadFileAsResource(filePath);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "*") // CORS para Google Viewer
                .body(resource);
    }
}

class UploadResponse {
    private String filePath;
    private String fileUrl;
    
    // Getters, setters, constructor
}
```

#### 1.4. Modificar DocumentoService.java
```java
@Service
public class DocumentoService {
    // ... código existente
    
    @Autowired
    private FileStorageService fileStorageService;
    
    public Documento create(DocumentoDTO objDto, MultipartFile file) throws IOException {
        // Upload do arquivo
        String filePath = fileStorageService.storeFile(file);
        
        objDto.setId(null);
        objDto.setArquivo(filePath); // Salva o caminho relativo
        
        Documento obj = new Documento(objDto);
        
        // ... resto do código
        
        return documentoRepo.save(obj);
    }
}
```

### Fase 2: Frontend - Upload e Visualização

#### 2.1. DocumentoFormPage.jsx - Adicionar Upload
```jsx
const DocumentoFormPage = () => {
  const [form, setForm] = useState({
    nome: "",
    arquivo: null, // Mudança: agora é File
    versaoDoc: 1,
    statusDocumento: "NAOPREENCHIDO",
    descricao: "",
    idFluxo: fluxoId || ""
  });
  
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setForm(f => ({ ...f, arquivo: file }));
    } else {
      setSnackbar({ 
        open: true, 
        message: "Apenas arquivos PDF são permitidos", 
        severity: "error" 
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.nome || !selectedFile) {
      setSnackbar({ open: true, message: "Preencha todos os campos obrigatórios", severity: "warning" });
      return;
    }

    setLoading(true);
    try {
      // Upload do arquivo
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('nome', form.nome);
      formData.append('versaoDoc', form.versaoDoc);
      formData.append('statusDocumento', form.statusDocumento);
      formData.append('descricao', form.descricao || '');
      if (form.idFluxo) {
        formData.append('idFluxo', form.idFluxo);
      }

      await api.post("/api/documentos", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setSnackbar({ open: true, message: "Documento enviado com sucesso!", severity: "success" });
      setTimeout(() => navigate(fluxoId ? `/fluxos/${fluxoId}/documentos` : "/documentos"), 1500);
    } catch (err) {
      setSnackbar({ open: true, message: "Erro ao enviar documento", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    // ...
    <div>
      <label className="text-white font-medium mb-2 flex items-center gap-2">
        <FileType size={18} className="text-blue-400" />
        Arquivo PDF *
      </label>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500"
      />
      {selectedFile && (
        <p className="text-sm text-emerald-400 mt-2">
          Arquivo selecionado: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}
    </div>
    // ...
  );
};
```

#### 2.2. PDFViewer.jsx - Componente Reutilizável
```jsx
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { Download, Maximize2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const PDFViewer = ({ fileUrl, fileName = "documento.pdf", fullHeight = false }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Construir URL do Google Docs Viewer
  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
  
  const handleDownload = () => {
    window.open(fileUrl, '_blank');
  };
  
  const handleFullscreen = () => {
    window.open(viewerUrl, '_blank');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative w-full ${fullHeight ? 'h-screen' : 'h-[600px]'} bg-gray-900 rounded-xl overflow-hidden border border-gray-700`}
    >
      {/* Loading State */}
      {loading && !error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
          <CircularProgress sx={{ color: '#10b981' }} size={48} />
          <p className="text-white mt-4 text-lg">Carregando PDF...</p>
          <p className="text-gray-400 text-sm mt-2">{fileName}</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
          <FileText className="text-red-400" size={64} />
          <p className="text-white mt-4 text-lg">Erro ao carregar PDF</p>
          <button 
            onClick={() => setError(false)}
            className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Tentar Novamente
          </button>
        </div>
      )}
      
      {/* PDF Viewer */}
      <iframe
        src={viewerUrl}
        className="w-full h-full border-0"
        title={fileName}
        onLoad={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
      
      {/* Toolbar */}
      {!loading && !error && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-4 right-4 flex gap-2"
        >
          <button 
            onClick={handleDownload}
            className="p-3 bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-lg transition-colors"
            title="Download"
          >
            <Download size={20} className="text-white" />
          </button>
          <button 
            onClick={handleFullscreen}
            className="p-3 bg-purple-600 rounded-lg hover:bg-purple-700 shadow-lg transition-colors"
            title="Abrir em tela cheia"
          >
            <Maximize2 size={20} className="text-white" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PDFViewer;
```

#### 2.3. DocumentoDetail.jsx - Usar PDFViewer
```jsx
import PDFViewer from '../../components/pdf/PDFViewer';

const DocumentoDetail = () => {
  const [documento, setDocumento] = useState(null);
  
  // Construir URL completa do arquivo
  const fileUrl = documento?.arquivo 
    ? `http://localhost:8080/api/files/proxy/${documento.arquivo}`
    : null;

  return (
    <div>
      {/* Header, info cards, etc */}
      
      {/* Visualizador de PDF */}
      {fileUrl && (
        <motion.div variants={itemVariants} className="mt-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="text-emerald-400" size={24} />
            Visualização do Documento
          </h3>
          <PDFViewer 
            fileUrl={fileUrl} 
            fileName={documento.nome} 
          />
        </motion.div>
      )}
    </div>
  );
};
```

---

## 🗺️ Roadmap de Implementação

### Sprint 1: MVP (1-2 dias)
- [x] Configurar upload de arquivos no backend
- [x] Criar FileStorageService
- [x] Criar endpoint de proxy (/api/files/proxy)
- [x] Modificar DocumentoFormPage para upload
- [x] Criar componente PDFViewer básico
- [x] Integrar na DocumentoDetail

### Sprint 2: Melhorias (2-3 dias)
- [ ] Adicionar validações de tamanho de arquivo
- [ ] Implementar thumbnail/preview do PDF
- [ ] Adicionar barra de progresso no upload
- [ ] Melhorar tratamento de erros
- [ ] Adicionar testes unitários

### Sprint 3: Otimizações (3-5 dias)
- [ ] Implementar compressão de PDFs grandes
- [ ] Cache de arquivos frequentes
- [ ] Otimizar estrutura de pastas
- [ ] Backup automático agendado
- [ ] Monitoramento de espaço em disco

### Sprint 4: Features Avançadas (5-7 dias)
- [ ] Versionamento de documentos
- [ ] Histórico de visualizações
- [ ] Marca d'água em PDFs
- [ ] Assinaturas digitais
- [ ] Exportar com anotações

---

## 📈 Migração Futura para Cloud (Opcional)

Caso o volume cresça significativamente:

### Quando Migrar?
- Volume > 100GB
- Múltiplos servidores (necessita CDN)
- Backup geográfico necessário

### Opções de Migração

#### Google Drive API
**Vantagens:** 15GB grátis, fácil integração  
**Quando:** Até 200GB, pequenas empresas  

#### Amazon S3
**Vantagens:** Ilimitado, alta performance  
**Quando:** > 200GB, escalabilidade crítica  

#### Azure Blob Storage
**Vantagens:** Integração Microsoft, híbrido  
**Quando:** Já usa Azure, precisa compliance  

---

## 🔒 Considerações de Segurança

### Validações Necessárias
```java
// FileStorageService.java

private void validateFile(MultipartFile file) throws IOException {
    // 1. Validar tipo MIME
    if (!"application/pdf".equals(file.getContentType())) {
        throw new IllegalArgumentException("Apenas PDFs permitidos");
    }
    
    // 2. Validar tamanho (max 50MB)
    if (file.getSize() > 50 * 1024 * 1024) {
        throw new IllegalArgumentException("Arquivo muito grande (max 50MB)");
    }
    
    // 3. Validar assinatura do arquivo (magic bytes)
    byte[] bytes = file.getBytes();
    if (bytes.length < 4 || bytes[0] != 0x25 || bytes[1] != 0x50 || bytes[2] != 0x44 || bytes[3] != 0x46) {
        throw new IllegalArgumentException("Arquivo corrompido ou não é PDF");
    }
    
    // 4. Scan de vírus (opcional - integrar com ClamAV)
    // virusScanner.scan(file);
}
```

### Controle de Acesso
```java
// FileController.java

@GetMapping("/proxy/{year}/{month}/{fileName:.+}")
public ResponseEntity<Resource> getFile(...) {
    // Verificar se usuário tem permissão para acessar este documento
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    Usuario usuario = usuarioRepository.findByEmail(email).orElseThrow();
    
    // Buscar documento pelo path
    Documento doc = documentoRepository.findByArquivo(filePath).orElseThrow();
    
    // Verificar permissão (exemplo: mesmo fluxo ou admin)
    if (!hasPermission(usuario, doc)) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    
    // Servir arquivo
    Resource resource = fileStorageService.loadFileAsResource(filePath);
    return ResponseEntity.ok()...
}
```

---

## 📚 Referências

- [Google Docs Viewer](https://docs.google.com/viewer)
- [PDF.js Mozilla](https://mozilla.github.io/pdf.js/)
- [React-PDF Documentation](https://github.com/wojtekmaj/react-pdf)
- [Spring Boot File Upload](https://spring.io/guides/gs/uploading-files/)
- [Google Drive API Docs](https://developers.google.com/drive/api/guides/about-sdk)

---

**Última Atualização:** 06/12/2025  
**Próxima Revisão:** Após implementação do MVP
