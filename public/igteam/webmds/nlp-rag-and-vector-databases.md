# Retrieval-Augmented Generation (RAG) & Vector Database Architecture

Retrieval-Augmented Generation (RAG) bridges external domain knowledge bases with parametric LLM memory. By conditioning generation on dynamically retrieved documents, RAG eliminates hallucinations and enables real-time context integration.

---

## 1. RAG Pipeline Overview

```
[User Query] ──> [Embedding Model] ──> [Vector Search (HNSW / FAISS)]
                                                   │
                                                   ▼
[Final Response] <── [LLM Generation] <── [Context Reranker (Cross-Encoder)]
```

---

## 2. Technical Stack & Implementation

### A. Document Chunking & Dense Embeddings
- **Chunking Strategies**: Recursive character splitting, semantic boundary chunking with overlap ($10\% \text{ to } 15\%$).
- **Embeddings**: `bge-large-en-v1.5`, `gte-large`, and `nomic-embed-text-v1.5`.

```python
from langchain.text_splitter import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=64,
    separators=["\n\n", "\n", " ", ""]
)

chunks = text_splitter.split_text(raw_document)
```

### B. Vector Indexing: HNSW vs IVFFlat
- **HNSW (Hierarchical Navigable Small World)**: Multi-layer graph index offering sub-linear search time with $>95\%$ recall.
- **Reranking**: Post-retrieval reranking using Cross-Encoders (`bge-reranker-large`) to filter out irrelevant chunks before passing context to LLM prompt windows.

---

## 3. Evaluation Metrics

1. **Faithfulness**: Proportion of generated statements grounded in context.
2. **Answer Relevance**: Semantic similarity between query and generated answer.
3. **Context Recall & Precision**: Proportion of ground-truth knowledge correctly retrieved.
