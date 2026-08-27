---
name: spec-kit
description: >-
  GitHub Spec Kit for Spec-Driven Development (SDD). Use when initializing specs,
  defining project constitutions, creating feature specifications, drafting technical plans,
  breaking specs into prioritized tasks, and executing spec-anchored development.
---

# GitHub Spec Kit (Spec-Driven Development)

**GitHub Spec Kit** enables **Spec-Driven Development (SDD)** with AI coding assistants. Instead of ad-hoc "vibe coding", Spec Kit anchors software development in living, structured specifications that serve as the single source of truth.

---

## Core SDD Workflow & Lifecycle

The Spec Kit workflow turns high-level intent into executable, testable software across 5 key phases:

1. **Constitution (`/speckit.constitution`)**: Define immutable core principles, non-negotiables, technology stack rules, and governance.
2. **Specify (`/speckit.specify`)**: Describe features in plain language focused on user stories (P1, P2, P3), acceptance criteria (Given-When-Then), and edge cases (technology-agnostic).
3. **Plan (`/speckit.plan`)**: Translate functional specs into concrete technical architecture, file changes, dependencies, and risk assessments.
4. **Tasks (`/speckit.tasks`)**: Break down implementation plans into discrete, independently verifiable developer tasks.
5. **Implement & Verify (`/speckit.implement`)**: Execute tasks phase-by-phase, running tests and verifying against acceptance criteria.

---

## 1. Project Constitution Template (`.specify/constitution.md`)

```markdown
# Project Constitution

## Core Principles

### I. Architectural Foundations
- Define non-negotiable tech stack choices, boundaries, and separation of concerns.

### II. Quality & Testing Standards
- Test-first requirement or mandatory verification for all features.

### III. Code Quality & Simplicity
- YAGNI principles: avoid unnecessary dependencies, over-engineering, and speculative abstractions.

### IV. Security & Compliance
- Data privacy, auth standards, secrets handling, and input validation requirements.

## Governance
- Constitution supersedes ad-hoc instructions.
- Amendments require documentation, rationale, and review.
```

---

## 2. Feature Specification Template (`specs/###-feature-name/spec.md`)

```markdown
# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`
**Status**: Draft / Approved

## User Scenarios & Testing

### User Story 1 - [Title] (Priority: P1)
- **Journey**: [Description]
- **Why P1**: [Core value proposition]
- **Independent Test**: [Verifiable test scenario]
- **Acceptance Criteria**:
  - **Given** [initial state], **When** [action], **Then** [expected outcome]

### User Story 2 - [Title] (Priority: P2)
- **Acceptance Criteria**:
  - **Given** [initial state], **When** [action], **Then** [expected outcome]

## Requirements

### Functional Requirements
- **FR-001**: System MUST [capability]
- **FR-002**: System MUST [behavior]

### Edge Cases
- Handling boundary conditions, error states, network drops, rate limits.

## Success Criteria
- **SC-001**: Measurable performance / UX / outcome metric.
```

---

## 3. Technical Implementation Plan (`specs/###-feature-name/plan.md`)

```markdown
# Technical Implementation Plan: [FEATURE NAME]

## Architecture & Data Flow
- Diagram / description of components involved.

## Proposed Code Changes

### [Component / Package Name]
- `[NEW]` File path & purpose
- `[MODIFY]` Existing file path & changes

## Risk Analysis & Dependencies
- Dependencies to install or configure.
- Migration risks, API changes, or breaking changes.
```

---

## 4. Actionable Tasks Breakdown (`specs/###-feature-name/tasks.md`)

```markdown
# Implementation Tasks: [FEATURE NAME]

- [ ] **Task 1 (P1 - Foundation)**: Create schema & data models.
- [ ] **Task 2 (P1 - Core Logic)**: Implement core function / API endpoint.
- [ ] **Task 3 (P1 - UI Component)**: Build UI view / page component.
- [ ] **Task 4 (P2 - Edge Cases)**: Add validation & error states.
- [ ] **Task 5 (Verification)**: Run unit / integration tests and manual check.
```

---

## Guidelines for AI Pair Programming with Spec Kit

- **Always verify against Constitution**: Before writing code, ensure proposed solutions comply with project principles.
- **Spec is the Anchor**: If ambiguous requirements arise during coding, pause and ask for clarification to update `spec.md`.
- **Independent Slices**: Keep User Stories prioritized so each increment delivers testable value.
