#include <stdio.h>
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int fahrToCels(int fahr)
{
  return 5 * (fahr - 32) / 9;
}