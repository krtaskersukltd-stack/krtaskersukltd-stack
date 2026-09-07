# Workspace Development Rules

These rules are strictly enforced for every task in this repository:

1. **Root Cause & Existing Code First**:
   - Always inspect existing code and find the true root cause before making any changes.
   - Reuse existing components, styles (CSS), and logic (JS/TS) to keep modifications minimal.

2. **No Duplication**:
   - Do NOT duplicate code, CSS classes, or JS functions.

3. **Clean Styling**:
   - Do NOT use `!important` or unnecessary override CSS rules. Keep specificity clean and modular.

4. **Clean Scripts & Events**:
   - Do NOT add duplicate event listeners or redundant/unnecessary JavaScript logic.

5. **Scope Isolation**:
   - Do NOT touch unrelated files or alter existing unaffected work.

6. **Responsiveness Verification**:
   - Always verify both Mobile and Desktop viewports.

7. **Validation**:
   - Always run build and check for errors/tests before declaring a task complete.

8. **Git Restraint**:
   - Do NOT commit, push, or deploy without explicit instructions from the user.
