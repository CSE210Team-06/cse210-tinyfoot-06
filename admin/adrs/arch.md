---
# These are optional metadata elements. Feel free to remove any of them.
status: "{accepted"
date: {2024-10-20}
decision-makers: {Sahil, Shushaanth, Ethan, Vincent}
consulted:
  {
    Stephen, U Lam, Gagan, Vedant, Neshant
  }
---

# Footnotes on the web

## Context and Problem Statement

Implement a more effecient version of Bigfoot or Littlefoot.


## Decision Drivers

- Short development window
- Little collective with web development
- Littlefoot was really complicated
- Bigfoot was outdated

## Considered Options

- Revamping Bigfoot
- Implementing our own tool

## Decision Outcome

Chosen option: Implementing our own tool, because we could keep things simpiler. We could stick to vanilla dependencies. We could estimate how long it would take us to implement it ourselves, but updating Bigfoot was an unkown time commitement.


### Consequences

- Good, no dependencies!
- Bad, still using jQuery
- Bad, poorly tested. We were not as thourogh about edge cases or large loads.
- Bad, we could have done this almost entirely in HTML

