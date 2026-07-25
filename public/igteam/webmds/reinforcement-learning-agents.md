# Deep Reinforcement Learning & Multi-Agent Control Systems

Reinforcement Learning (RL) enables autonomous agents to learn optimal decision-making strategies by interacting with complex environment feedback loops. At COPS IG, our RL wing develops algorithms spanning single-agent policy gradients to multi-agent competitive environments.

---

## 1. Mathematical Formulation: Markov Decision Process (MDP)

An RL environment is formalized as a tuple `(S, A, P, R, γ)`:
- **S**: Set of environment states.
- **A**: Set of available actions.
- **P(s' | s, a)**: State transition probability function.
- **R(s, a, s')**: Scalar reward feedback signal.
- **γ ∈ [0, 1)**: Discount factor for future rewards.

**Goal**: Maximize cumulative expected return `J(π) = E [ ∑ γᵗ R(s_t, a_t) ]`.

---

## 2. Core Algorithms & Architectures

### A. Proximal Policy Optimization (PPO)
PPO restricts policy updates to a trusted region using a clipped surrogate objective, preventing catastrophic collapse during training:

`L_CLIP(θ) = E [ min( r_t(θ) A_t , clip(r_t(θ), 1-ε, 1+ε) A_t ) ]`

```python
import torch
import torch.nn as nn

class ActorCritic(nn.Module):
    def __init__(self, state_dim, action_dim):
        super().__init__()
        self.actor = nn.Sequential(
            nn.Linear(state_dim, 128),
            nn.ReLU(),
            nn.Linear(128, action_dim),
            nn.Softmax(dim=-1)
        )
        self.critic = nn.Sequential(
            nn.Linear(state_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 1)
        )

    def forward(self, state):
        probs = self.actor(state)
        value = self.critic(state)
        return probs, value
```

### B. Decision Transformers (Offline RL)
Instead of fitting value functions via temporal difference (TD) learning, **Decision Transformers** frame RL as a sequence modeling task over trajectories `(R_1, s_1, a_1, R_2, s_2, a_2, ...)` using GPT-style autoregressive transformers.

---

## 3. Active Projects & Benchmarks

- **SimuRL Arena**: Multi-agent competitive benchmark for autonomous strategy games.
- **Continuous Control**: Soft Actor-Critic (SAC) implementation for quadruped robotic simulation.
- **Environment Tooling**: Gymnasium, PettingZoo, Ray RLlib, Stable-Baselines3.
