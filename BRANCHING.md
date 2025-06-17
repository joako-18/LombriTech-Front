# Estructura común de ramas

## 1. `main` o `master`
- **Propósito**: Contiene el código estable y listo para producción.
- **Regla**: Solo se hace merge de ramas que ya hayan sido probadas (como `release` o `develop`).

## 2. `develop`
- **Propósito**: Versión más reciente del desarrollo que integra múltiples funcionalidades.
- **Regla**: Aquí se integran las ramas de funcionalidades (`feature/*`) y se prueban antes de pasar a producción.

## 3. `feature/*`
- **Propósito**: Para desarrollar nuevas funcionalidades o mejoras.
- **Nombre común**: `feature/login`, `feature/registro`, etc.
- **Base**: Se crean a partir de `develop` y se fusionan (merge) nuevamente en `develop`.

## 4. `bugfix/*`
- **Propósito**: Solucionar errores detectados durante el desarrollo.
- **Base**: Se crean desde `develop` y también se hacen merge ahí.

## 5. `hotfix/*`
- **Propósito**: Corrección de errores críticos en producción.
- **Base**: Se crean desde `main` y luego se hace merge tanto en `main` como en `develop`.

## 6. `release/*`
- **Propósito**: Preparar una nueva versión para producción (ajustes finales, documentación, etc).
- **Base**: Se crean desde `develop` y, cuando están listas, se hace merge a `main` y `develop`.
