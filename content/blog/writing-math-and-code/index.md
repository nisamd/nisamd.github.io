---
title: A small notebook on discounted returns
description: A sample post showing math, code, tables, footnotes, and the table of contents.
date: 2026-11-13
tags:
  - research
  - rl
draft: true
---

This is a sample post for checking how writing looks on the site. It is a draft, so it is not published. Delete it or remove `draft: true` when you no longer need it.

## A discounted sum

A useful starting point in reinforcement learning is the discounted return. For rewards $r_t$ and a discount factor $0 \leq \gamma < 1$, define

$$
G_t = \sum_{k=0}^{\infty} \gamma^k r_{t+k+1}. \tag{1}
$$

Equation (1) gives more weight to rewards received sooner. The discount factor is a modeling choice, not a measurement of how much a real person values the future.[^discount]

[^discount]: Finite-horizon problems can also be modeled without discounting.

## A simple bound

**Theorem 1 (Bounded discounted return).** If $|r_t| \leq R$ for every $t$, then $|G_t| \leq R/(1-\gamma).$

*Proof.* By the triangle inequality and the geometric series,

$$
|G_t| \leq \sum_{k=0}^{\infty}\gamma^k |r_{t+k+1}| \leq R \sum_{k=0}^{\infty}\gamma^k = \frac{R}{1-\gamma}. \qquad \blacksquare
$$

## A finite calculation

```python
def discounted_return(rewards, gamma=0.9):
    """Calculate the return for a finite sequence of rewards."""
    total = 0.0
    for reward in reversed(rewards):
        total = reward + gamma * total
    return total

print(discounted_return([1, 1, 1]))  # 2.71
```

For a constant reward of one, Table 1 compares a three-step sum with its infinite counterpart.

| Discount $\gamma$ | Three steps | Infinite horizon |
|:--|--:|--:|
| 0.0 | 1.00 | 1.00 |
| 0.5 | 1.75 | 2.00 |
| 0.9 | 2.71 | 10.00 |

*Table 1: Returns for a constant reward of one.*

### A note on notation

> Good notation makes assumptions visible. It cannot choose those assumptions for us.

## References

1. Richard S. Sutton and Andrew G. Barto. *Reinforcement Learning: An Introduction*, 2nd ed. MIT Press, 2018. <http://incompleteideas.net/book/the-book-2nd.html>
