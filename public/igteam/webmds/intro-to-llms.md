# Introduction to Large Language Model Fine-Tuning & Alignment

Large Language Models (LLMs) have transformed artificial intelligence. However, adapting pretrained foundation models to specialized domain tasks efficiently remains a central challenge in ML research. At COPS IG NLP Wing, we specialize in state-of-the-art fine-tuning and alignment techniques.

---

## 1. Parameter-Efficient Fine-Tuning (PEFT)

Full parameter fine-tuning of multi-billion parameter models requires massive computational infrastructure and high memory bandwidth. **Low-Rank Adaptation (LoRA)** reduces trainable parameters by up to 99% while preserving downstream accuracy by decomposing weight update matrices `ΔW` into low-rank matrices `A` and `B`:

`ΔW = B · A   where B ∈ R^(d × r), A ∈ R^(r × k), r « min(d, k)`

```python
from peft import LoraConfig, get_peft_model
import torch

lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM"
)

# Model initialization with PEFT
# model = get_peft_model(base_model, lora_config)
```

---

## 2. Alignment Strategies: DPO vs RLHF

Direct Preference Optimization (DPO) simplifies reinforcement learning from human feedback by eliminating the need for a separate reward model, optimizing policy directly via cross-entropy parameterization over preference pairs `(x, y_w, y_l)`.

### Advantages of DPO over RLHF:
- **No Reward Model**: Eliminates reward model instability and reward hacking.
- **Single Stage Optimization**: Directly optimizes policy on preference pairs.
- **Lower Compute Footprint**: Requires half the VRAM compared to PPO-based RLHF.

---

## 3. Deployment & Quantization

- **AWQ / GGUF Quantization**: Compressing 16-bit float weights into 4-bit representation for high-speed edge and local GPU inference.
- **vLLM Engine**: Continuous batching and PagedAttention for maximum throughput execution.
