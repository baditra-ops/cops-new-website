# Vision Transformers (ViT) & Spatial Perception in Computer Vision

Computer Vision (CV) has undergone a fundamental paradigm shift. Traditional Convolutional Neural Networks (CNNs) rely on local receptive fields, whereas **Vision Transformers (ViT)** leverage self-attention mechanisms to model global spatial relationships across entire images.

---

## 1. Vision Transformer Architecture

The ViT architecture processes an input image `X` of size `(H × W × C)` by dividing it into a sequence of non-overlapping patches `X_p` of resolution `(P × P)`. The resulting sequence has length `N = (H × W) / P²`.

```python
import torch
import torch.nn as nn

class PatchEmbedding(nn.Module):
    def __init__(self, in_channels=3, patch_size=16, embed_dim=768):
        super().__init__()
        self.proj = nn.Conv2d(
            in_channels, embed_dim, 
            kernel_size=patch_size, stride=patch_size
        )
        
    def forward(self, x):
        # x shape: (batch_size, 3, H, W)
        x = self.proj(x) # (batch_size, embed_dim, H/P, W/P)
        x = x.flatten(2).transpose(1, 2) # (batch_size, N_patches, embed_dim)
        return x
```

---

## 2. Key CV Sub-Domains at COPS IG

Our Computer Vision research group focuses on three core pillars:

### A. Real-Time Spatial Perception
- **End-to-End Object Detection (DETR)**: Eliminates handcrafted NMS (Non-Maximum Suppression) using bipartite matching loss.
- **Semantic & Instance Segmentation**: High-precision pixel classification for autonomous navigating platforms.

### B. 3D Neural Rendering & NeRFs
- **Neural Radiance Fields (NeRF)**: Synthesizing novel views of complex 3D scenes from 2D images using implicit neural representation.
- **3D Gaussian Splatting**: Real-time rendering of radiative volumetric scenes at >100 FPS.

```python
# Sample PyTorch snippet for positional encoding in NeRF
def positional_encoding(x, L=10):
    out = [x]
    for i in range(L):
        out.append(torch.sin((2**i) * torch.pi * x))
        out.append(torch.cos((2**i) * torch.pi * x))
    return torch.cat(out, dim=-1)
```

---

## 3. Benchmarks & Optimization

- **Frameworks**: PyTorch, TorchVision, OpenCV, ONNX Runtime.
- **Deployment**: TensorRT INT8 quantization for edge robotic accelerators (NVIDIA Jetson, CUDA clusters).
- **Target Performance**: Under 15ms per frame inference latency.
