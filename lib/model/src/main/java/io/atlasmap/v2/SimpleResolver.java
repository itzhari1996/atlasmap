package io.atlasmap.v2;

import java.io.IOException;
import java.util.HashMap;
import java.util.ServiceLoader;

import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.fasterxml.jackson.databind.DatabindContext;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.jsontype.TypeIdResolver;
import com.fasterxml.jackson.databind.type.TypeFactory;

public class SimpleResolver implements TypeIdResolver {


    protected final HashMap<Class<?>, String> typeToId = new HashMap<Class<?>, String>();
    protected final HashMap<String, JavaType> idToType = new HashMap<String, JavaType>();

    private JavaType baseType;

    @Override
    public void init(JavaType baseType) {
        this.baseType = baseType;
        Class<?> baseClass = baseType.getRawClass();

        ServiceLoader<?> implementations = ServiceLoader.load(baseClass, baseClass.getClassLoader());
        for (Object o : implementations) {
            Class<?> c = o.getClass();
            if (c != baseClass && baseClass.isAssignableFrom(c)) {
                JsonTypeName jsonAnnoation = c.getAnnotation(JsonTypeName.class);
                String shortName = null;
                if (jsonAnnoation != null && jsonAnnoation.value() != null) {
                    shortName = jsonAnnoation.value();
                } else {
                    XmlRootElement xmlAnnoation = c.getAnnotation(XmlRootElement.class);
                    if (xmlAnnoation != null && xmlAnnoation.name() != null) {
                        shortName = xmlAnnoation.name();
                    } else {
                        shortName = c.getSimpleName();
                    }
                }
                typeToId.put(c, shortName);
                idToType.put(shortName, TypeFactory.defaultInstance().constructSpecializedType(baseType, c));
                idToType.put(c.getName(), TypeFactory.defaultInstance().constructSpecializedType(baseType, c));
            }
        }
    }

    @Override
    public JsonTypeInfo.Id getMechanism() {
        return JsonTypeInfo.Id.CUSTOM;
    }

    @Override
    public String idFromValue(Object value) {
        return idFromValueAndType(value, value.getClass());
    }

    @Override
    public String idFromValueAndType(Object value, Class<?> aClass) {
        String rc = typeToId.get(aClass);
        if (rc == null) {
            throw new IllegalArgumentException("Invalid type: " + aClass);
        }
        return rc;
    }

    @Override
    public String idFromBaseType() {
        return idFromValueAndType(null, baseType.getRawClass());
    }

    @Override
    public JavaType typeFromId(DatabindContext databindContext, String id) throws IOException {
        JavaType rc = idToType.get(id);
        if (rc == null) {
            throw new IllegalArgumentException("Invalid type id: " + id);
        }
        return rc;
    }

    @Override
    public String getDescForKnownTypeIds() {
        return "valid values: " + idToType.keySet();
    }


}
