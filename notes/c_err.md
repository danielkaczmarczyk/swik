running `deno test` on this commit throws the following error when trying to insertAtPosition in the middle:

```
#
# Fatal error in , line 0
# Fatal JavaScript invalid size error 169220804
#
#
#
#FailureMessage Object: 0x700004cb8910
==== C stack trace ===============================

    0   deno                                0x0000000101a22c43 v8::base::debug::StackTrace::StackTrace() + 19
    1   deno                                0x0000000101a2846b v8::platform::(anonymous namespace)::PrintStackTrace() + 27
    2   deno                                0x0000000101a18b43 V8_Fatal(char const*, ...) + 323
    3   deno                                0x0000000101c01036 v8::internal::FactoryBase<v8::internal::Factory>::NewFixedArray(int, v8::internal::AllocationType) + 70
    4   deno                                0x0000000101dd0b78 v8::internal::(anonymous namespace)::ElementsAccessorBase<v8::internal::(anonymous namespace)::FastPackedObjectElementsAccessor, v8::internal::(anonymous namespace)::ElementsKindTraits<(v8::internal::ElementsKind)2>>::ConvertElementsWithCapacity(v8::internal::Handle<v8::internal::JSObject>, v8::internal::Handle<v8::internal::FixedArrayBase>, v8::internal::ElementsKind, unsigned int, unsigned int, unsigned int) + 120
    5   deno                                0x0000000101dcf35d v8::internal::(anonymous namespace)::ElementsAccessorBase<v8::internal::(anonymous namespace)::FastPackedObjectElementsAccessor, v8::internal::(anonymous namespace)::ElementsKindTraits<(v8::internal::ElementsKind)2>>::GrowCapacity(v8::internal::Handle<v8::internal::JSObject>, unsigned int) + 221
    6   deno                                0x0000000102064b8e v8::internal::Runtime_GrowArrayElements(int, unsigned long*, v8::internal::Isolate*) + 222
    7   deno                                0x0000000102a4d7b8 Builtins_CEntry_Return1_DontSaveFPRegs_ArgvOnStack_NoBuiltinExit + 56
```